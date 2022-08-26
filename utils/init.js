const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(process.env.RINKEBY_RPC);
const signer = new ethers.Wallet(process.env.DEPLOYER_PK, provider);

module.exports = { provider, signer };
