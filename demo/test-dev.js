const { ChainId, Token, TokenAmount, Fetcher, Pair, Route, Trade, TradeType, Percent } = require('../dist');

const { JsonRpcProvider } = require("@ethersproject/providers");
const provider = new JsonRpcProvider('https://data-seed-prebsc-2-s2.binance.org:8545/');

const addresses = {
    WBNB: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
    BUSD: '0x78867bbeef44f2326bf8ddd1941a4439382ef2a7',
}

const tradeAmount = '1'

const init = async () => {

    const [WBNB, BUSD] = await Promise.all(
        [addresses.WBNB, addresses.BUSD].map(tokenAddress => (
            new Token(
                ChainId.BSCTESTNET,
                tokenAddress,
                18
            )
        )));

    const pair = await Fetcher.fetchPairData(WBNB, BUSD, provider)
    const route = await new Route([pair], WBNB)
    const trade = await new Trade(route, new TokenAmount(WBNB, tradeAmount), TradeType.EXACT_INPUT)

    const slippageTolerance = new Percent('50', '10000')

    // create transaction parameters
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw
    const path = [WBNB.address, BUSD.address]
    // const to = admin
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20

    console.log('amountOutMin', amountOutMin, path, deadline);
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
    // // let contract = new ethers.Contract(WBNB.address, abi, signer)
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
