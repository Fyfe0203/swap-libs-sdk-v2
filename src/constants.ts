/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-22 14:56:48
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-22 15:40:56
 * @Description:
 * @FilePath: /swap-libs-sdk-v2/src/constants.ts
 */
import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,

  BSCNET = 56,
  BSCTESTNET = 97,

  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,
  OPTIMISM = 10,
  OPTIMISTIC_KOVAN = 69
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}
// uniswap v2
const Uni_FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
const Uni_INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'
// uniswap v1

export const FACTORY_ADDRESS: { [key: number]: string } = {
  [ChainId.MAINNET]: Uni_FACTORY_ADDRESS,
  [ChainId.ROPSTEN]: Uni_FACTORY_ADDRESS,
  [ChainId.RINKEBY]: Uni_FACTORY_ADDRESS,
  [ChainId.KOVAN]: Uni_FACTORY_ADDRESS,
  [ChainId.GOERLI]: Uni_FACTORY_ADDRESS,

  [ChainId.BSCNET]: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
  [ChainId.BSCTESTNET]: '0xb7926c0430afb07aa7defde6da862ae0bde767bc'
}

export const INIT_CODE_HASH: { [key: number]: string } = {
  [ChainId.MAINNET]: Uni_INIT_CODE_HASH,
  [ChainId.ROPSTEN]: Uni_INIT_CODE_HASH,
  [ChainId.RINKEBY]: Uni_INIT_CODE_HASH,
  [ChainId.KOVAN]: Uni_INIT_CODE_HASH,
  [ChainId.GOERLI]: Uni_INIT_CODE_HASH,

  [ChainId.BSCNET]: '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
  [ChainId.BSCTESTNET]: '0xecba335299a6693cb2ebc4782e74669b84290b6378ea3a3873c7231a8d7d1074'
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const FEES_NUMERATOR = JSBI.BigInt(997)
export const FEES_DENOMINATOR = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
