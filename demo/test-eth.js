/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-22 14:56:48
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-22 15:15:46
 * @Description:
 * @FilePath: /swap-libs-sdk-v2/demo/test-eth.js
 */
const { ChainId, Token, TokenAmount, Fetcher, Pair, Route, Trade, TradeType, Percent } = require('../dist')

const { JsonRpcProvider } = require('@ethersproject/providers')
const provider = new JsonRpcProvider('https://goerli.infura.io/v3/76c42453a4ee48b8a4bc6465baca88e5')

const addresses = {
  WETH: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  USDT: '0x9704D8B40ad05D3F024923D9627640F8345763CD'
}

const tradeAmount = '100000000000000000'

const init = async () => {
  const [WETH, USDT] = await Promise.all(
    [addresses.WETH, addresses.USDT].map(tokenAddress => new Token(ChainId.GOERLI, tokenAddress, 18))
  )

  const pair = await Fetcher.fetchPairData(WETH, USDT, provider)
  const route = await new Route([pair], WETH)
  const trade = await new Trade(route, new TokenAmount(WETH, tradeAmount), TradeType.EXACT_INPUT)

  const slippageTolerance = new Percent('50', '10000')

  // create transaction parameters
  const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw
  const path = [WETH.address, USDT.address]
  // const to = admin
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20

  console.log('amountOutMin', amountOutMin, path, deadline)
  // // Create signer
  // const wallet = new ethers.Wallet(
  //     Buffer.from(
  //         process.env.PRIVATE_KEY, // paste your private key from metamask here
  //         "hex"
  //     )
  // )
  // const signer = wallet.connect(provider)

  // // Create Pancakeswap ethers Contract
  // const pancakeswap = new ethers.Contract(
  //     addresses.PANCAKE_ROUTER,
  //     ['function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'],
  //     signer
  // )

  // // Allow Pancakeswap
  // // let abi = ["function approve(address _spender, uint256 _value) public returns (bool success)"]
  // // let contract = new ethers.Contract(WETH.address, abi, signer)
  // // await contract.approve(addresses.PANCAKE_ROUTER, ethers.utils.parseUnits('1000.0', 18), {gasLimit: 100000, gasPrice: 5e9})

  // // Execute transaction
  // const tx = await pancakeswap.swapExactTokensForTokens(
  //     ethers.utils.parseUnits('0.001', 18),
  //     ethers.utils.parseUnits(web3.utils.fromWei(amountOutMin.toString()), 18),
  //     path,
  //     to,
  //     deadline,
  //     { gasLimit: ethers.utils.hexlify(200000), gasPrice: ethers.utils.parseUnits("10", "gwei") }
  // )

  // console.log(`Tx-hash: ${tx.hash}`)

  // const receipt = await tx.wait();

  // console.log(`Tx was mined in block: ${receipt.blockNumber}`)
}

init()
