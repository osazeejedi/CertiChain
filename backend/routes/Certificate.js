const express = require('express');
const Certificate = require('../models/Certificate');
const { signer } = require('../config/ethersConfig');
const LitJsSdk = require('@lit-protocol/lit-node-client');
const { encryptString, decryptString } = require('@lit-protocol/crypto');
const ethers = require('ethers');

const router = express.Router();

// Initialize Lit client
const litClient = new LitJsSdk.LitNodeClient();
litClient.connect();

// Middleware to verify JWT (implement this)
const verifyToken = (req, res, next) => {
  // Implement JWT verification
};

// Issue certificate
router.post('/issue', verifyToken, async (req, res) => {
  try {
    const { recipientName, recipientEmail } = req.body;
    
    const certificateData = { recipientName, recipientEmail, issueDate: new Date() };
    const certificateString = JSON.stringify(certificateData);

    // Sign the certificate data
    const signature = await signer.signMessage(certificateString);

    // Encrypt the certificate data and signature using Lit Protocol
    const { ciphertext, symmetricKey } = await encryptString(JSON.stringify({ certificateData, signature }));
    
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: 'ethereum' });
    const accessControlConditions = [
      {
        contractAddress: '',
        standardContractType: '',
        chain: 'ethereum',
        method: 'eth_getBalance',
        parameters: [':userAddress', 'latest'],
        returnValueTest: {
          comparator: '>=',
          value: '0'  // This allows any Ethereum address to access
        }
      }
    ];

    const encryptedSymmetricKey = await litClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain: 'ethereum',
    });

    const certificate = new Certificate({
      recipientName,
      recipientEmail,
      encryptedData: ciphertext,
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, 'base16')
    });
    
    await certificate.save();
    res.status(201).json({ message: 'Certificate issued successfully', certificateId: certificate._id });
  } catch (error) {
    console.error('Certificate issuance failed:', error);
    res.status(500).json({ error: 'Certificate issuance failed' });
  }
});

// Verify certificate
router.get('/verify/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).json({ error: 'Certificate not found' });
    
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: 'ethereum' });
    const accessControlConditions = [
      {
        contractAddress: '',
        standardContractType: '',
        chain: 'ethereum',
        method: 'eth_getBalance',
        parameters: [':userAddress', 'latest'],
        returnValueTest: {
          comparator: '>=',
          value: '0'  // This allows any Ethereum address to access
        }
      }
    ];

    const symmetricKey = await litClient.getEncryptionKey({
      accessControlConditions,
      toDecrypt: certificate.encryptedSymmetricKey,
      chain: 'ethereum',
      authSig
    });

    const decryptedData = await decryptString(
      certificate.encryptedData,
      symmetricKey
    );

    const { certificateData, signature } = JSON.parse(decryptedData);

    // Verify the signature
    const signerAddress = ethers.utils.verifyMessage(JSON.stringify(certificateData), signature);
    const expectedAddress = await signer.getAddress();
    const isValid = signerAddress === expectedAddress;
    
    res.json({ isValid, certificate: certificateData });
  } catch (error) {
    console.error('Certificate verification failed:', error);
    res.status(500).json({ error: 'Certificate verification failed' });
  }
});

module.exports = router;