/**
 * BNB Smart Chain configuration for Yamata integrations.
 * Chain ID 56 (mainnet) is the production network for Yamata on BNB.
 */

export interface BnbChainConfig {
  chainId: 56;
  name: "bnb-mainnet";
  nativeCurrency: {
    name: "BNB";
    symbol: "BNB";
    decimals: 18;
  };
  rpcUrls: {
    default: { http: string[] };
    public: { http: string[] };
  };
  blockExplorers: {
    default: { name: "BscScan"; url: string };
  };
}

/**
 * Production BNB Smart Chain (mainnet).
 * Use this for all Yamata BNB references.
 */
export const bnbMainnet: BnbChainConfig = {
  chainId: 56,
  name: "bnb-mainnet",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        "https://bsc-dataseed.binance.org",
        "https://bsc-dataseed1.binance.org",
        "https://bsc.publicnode.com",
      ],
    },
    public: {
      http: [
        "https://bsc-dataseed.binance.org",
        "https://bsc.publicnode.com",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://bscscan.com",
    },
  },
};

export const BNB_MAINNET_CHAIN_ID = 56 as const;
