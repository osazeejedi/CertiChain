const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
const signer = new ethers.Wallet(process.env.ISSUER_PRIVATE_KEY, provider);

module.exports = { provider, signer };