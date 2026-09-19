/**
 * Official Yamata production addresses on BNB Smart Chain (chainId 56).
 *
 * Source of truth: on-chain deployment verified via BscScan and public RPC.
 * This package intentionally contains ONLY address constants and public
 * configuration. No implementation logic, no risk engine, no pricing,
 * no liquidation strategies.
 *
 * Yamata contracts are deployed and operated by Yamata (Maroon-io).
 * External contracts (Morpho, predict.fun CTF/exchanges, USDT, Safe infra)
 * are third-party and labelled as such.
 */

export const BNB_CHAIN_ID = 56 as const;

export interface ContractRef {
  address: `0x${string}`;
  name: string;
  bscscan: string;
  note?: string;
}

/** Core Yamata-owned / Yamata-deployed contracts on BNB mainnet. */
export const YAMATA_CONTRACTS: Record<string, ContractRef> = {
  presage: {
    address: "0xc2eaa0778dc629bd69b905727482792742c06ea7",
    name: "Presage",
    bscscan: "https://bscscan.com/address/0xc2eaa0778dc629bd69b905727482792742c06ea7",
    note: "Core protocol (credit/aggregation layer)",
  },
  priceHub: {
    address: "0x1b24678acf29e25889dab8492b78d472b06c46fa",
    name: "PriceHub",
    bscscan: "https://bscscan.com/address/0x1b24678acf29e25889dab8492b78d472b06c46fa",
  },
  guardianPool: {
    address: "0x7b65d2fc63f6d3893b4d68e8fdb4cf5208d1f637",
    name: "Guardian Pool",
    bscscan: "https://bscscan.com/address/0x7b65d2fc63f6d3893b4d68e8fdb4cf5208d1f637",
    note: "Liquidation capital pool",
  },
  vault: {
    address: "0x3130b99Edf12FF619a870D2640687d00AF62103E",
    name: "Vault (MetaMorpho)",
    bscscan: "https://bscscan.com/address/0x3130b99Edf12FF619a870D2640687d00AF62103E",
    note: "Presage USDT Vault",
  },
  vaultFactory: {
    address: "0xb12f2ad9eb04b721355c0ea4999189e7bc95e9e4",
    name: "Vault Factory",
    bscscan: "https://bscscan.com/address/0xb12f2ad9eb04b721355c0ea4999189e7bc95e9e4",
  },
  wrapperFactory: {
    address: "0xaaad78e30516f6584a048a19bb3771f9b7d4281f",
    name: "Wrapper Factory",
    bscscan: "https://bscscan.com/address/0xaaad78e30516f6584a048a19bb3771f9b7d4281f",
  },
  safeBatchHelper: {
    address: "0x10d893b26d91ef38b17df0ed595cf38d30d5bc1b",
    name: "Safe Batch Helper",
    bscscan: "https://bscscan.com/address/0x10d893b26d91ef38b17df0ed595cf38d30d5bc1b",
  },
  pullPriceAdapter: {
    address: "0xf0ee1442c3197be86b6a3c6456ea225a5575b2e3",
    name: "Pull Price Adapter",
    bscscan: "https://bscscan.com/address/0xf0ee1442c3197be86b6a3c6456ea225a5575b2e3",
  },
  fixedPriceAdapter: {
    address: "0xbc8660d8c7a99ea51eb90c224af91a831d7a264a",
    name: "Fixed Price Adapter",
    bscscan: "https://bscscan.com/address/0xbc8660d8c7a99ea51eb90c224af91a831d7a264a",
  },
  verifier: {
    address: "0xd05ebfdd877e37fa4a66763175b16ad4e3fc4fcf",
    name: "Verifier",
    bscscan: "https://bscscan.com/address/0xd05ebfdd877e37fa4a66763175b16ad4e3fc4fcf",
  },
} as const;

/** External / third-party contracts integrated with Yamata on BNB (NOT Yamata deployments). */
export const EXTERNAL_CONTRACTS: Record<string, ContractRef> = {
  morpho: {
    address: "0x01b0Bd309AA75547f7a37Ad7B1219A898E67a83a",
    name: "Morpho Blue",
    bscscan: "https://bscscan.com/address/0x01b0Bd309AA75547f7a37Ad7B1219A898E67a83a",
    note: "External (Morpho protocol)",
  },
  irm: {
    address: "0x7112D95cB5f6b13bF5F5B94a373bB3b2B381F979",
    name: "IRM (Morpho Adaptive Curve)",
    bscscan: "https://bscscan.com/address/0x7112D95cB5f6b13bF5F5B94a373bB3b2B381F979",
    note: "External (Morpho)",
  },
  usdt: {
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT (BNB)",
    bscscan: "https://bscscan.com/address/0x55d398326f99059fF775485246999027B3197955",
    note: "External token (Tether)",
  },
  // predict.fun venue on BNB (integration dependency, not Yamata)
  predictFunCtf: {
    address: "0x22DA1810B194ca018378464a58f6Ac2B10C9d244",
    name: "predict.fun CTF (standard)",
    bscscan: "https://bscscan.com/address/0x22DA1810B194ca018378464a58f6Ac2B10C9d244",
    note: "External (predict.fun)",
  },
  // Safe / AA infrastructure (standard deployments, not Yamata authored)
  safeSingleton: {
    address: "0x5be481E3858454DdFD8E45702B52C90559cc75fd",
    name: "Safe Singleton",
    bscscan: "https://bscscan.com/address/0x5be481E3858454DdFD8E45702B52C90559cc75fd",
    note: "External (Safe)",
  },
  safeProxyFactory: {
    address: "0xef4C89216d3b663ff387bd606891a7546D954FAf",
    name: "Safe Proxy Factory",
    bscscan: "https://bscscan.com/address/0xef4C89216d3b663ff387bd606891a7546D954FAf",
    note: "External (Safe)",
  },
  entryPoint4337: {
    address: "0xb55FFeE150553987e198B4d3aEEDE9BdD471284d",
    name: "EntryPoint 4337",
    bscscan: "https://bscscan.com/address/0xb55FFeE150553987e198B4d3aEEDE9BdD471284d",
    note: "External (ERC-4337)",
  },
} as const;

/** All Yamata + key external for convenience. */
export const ALL_BNB_ADDRESSES = {
  ...YAMATA_CONTRACTS,
  ...EXTERNAL_CONTRACTS,
} as const;

export type YamataContractName = keyof typeof YAMATA_CONTRACTS;
export type ExternalContractName = keyof typeof EXTERNAL_CONTRACTS;
