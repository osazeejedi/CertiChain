const { EthSign } = require('@ethsign/sdk');

const ethSign = new EthSign({
  rpcUrl: process.env.ETHEREUM_RPC_URL,
  ipfsUrl: process.env.IPFS_URL,
});

module.exports = ethSign;