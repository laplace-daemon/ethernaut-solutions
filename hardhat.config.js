require('@nomiclabs/hardhat-ethers');

module.exports = {
    defaultNetwork: 'rinkeby',
    networks: {
        rinkeby: {
            url: process.env.RINKEBY_RPC,
            accounts: [process.env.DEPLOYER_PK],
        },
    },
    solidity: {
        version: '0.6.12',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    paths: {
        sources: './src',
    },
};
