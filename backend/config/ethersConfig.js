const ethers = require('ethers');
ethereumrpc ="https://eth-sepolia.g.alchemy.com/v2/gfYUmjo0p1El5HGOEID9fbeeXHFPB-yo";
private ='dd1b9d585de6bb48032dd0ab1527aae116f61e30e1be9a0eb380864dd1dfb6b8'

//if (!process.env.ETHEREUM_RPC_URL) {
//  throw new Error('ETHEREUM_RPC_URL is not defined in the environment variables');
//}

//if (!process.env.ISSUER_PRIVATE_KEY) {
//  throw new Error('ISSUER_PRIVATE_KEY is not defined in the environment variables');
//}

const provider = new ethers.JsonRpcProvider(ethereumrpc);
const signer = new ethers.Wallet(private, provider);

module.exports = { provider, signer };