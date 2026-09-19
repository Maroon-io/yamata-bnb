#!/usr/bin/env tsx
/**
 * verify-bnb-deployment.ts
 *
 * Verifies that Yamata is genuinely deployed on BNB Smart Chain mainnet (chainId 56).
 *
 * - Asserts correct chain ID via public RPC.
 * - Calls eth_getCode for each core Yamata contract.
 * - Fails if any expected contract is missing deployed bytecode.
 * - Prints BscScan links for manual review.
 *
 * This script contains NO proprietary logic, NO ABIs, NO business rules.
 * It only proves on-chain presence of the known Yamata addresses.
 *
 * Run:
 *   npm run verify:bnb
 *   # or
 *   npx tsx scripts/verify-bnb-deployment.ts
 */

const RPC_URL = "https://bsc-dataseed.binance.org";
const EXPECTED_CHAIN_ID = 56;

interface ContractToVerify {
  name: string;
  address: string;
  bscscan: string;
}

const CORE_YAMATA_CONTRACTS: ContractToVerify[] = [
  {
    name: "Presage",
    address: "0xc2eaa0778dc629bd69b905727482792742c06ea7",
    bscscan: "https://bscscan.com/address/0xc2eaa0778dc629bd69b905727482792742c06ea7",
  },
  {
    name: "PriceHub",
    address: "0x1b24678acf29e25889dab8492b78d472b06c46fa",
    bscscan: "https://bscscan.com/address/0x1b24678acf29e25889dab8492b78d472b06c46fa",
  },
  {
    name: "Guardian Pool",
    address: "0x7b65d2fc63f6d3893b4d68e8fdb4cf5208d1f637",
    bscscan: "https://bscscan.com/address/0x7b65d2fc63f6d3893b4d68e8fdb4cf5208d1f637",
  },
  {
    name: "Vault (MetaMorpho)",
    address: "0x3130b99Edf12FF619a870D2640687d00AF62103E",
    bscscan: "https://bscscan.com/address/0x3130b99Edf12FF619a870D2640687d00AF62103E",
  },
  {
    name: "Wrapper Factory",
    address: "0xaaad78e30516f6584a048a19bb3771f9b7d4281f",
    bscscan: "https://bscscan.com/address/0xaaad78e30516f6584a048a19bb3771f9b7d4281f",
  },
  {
    name: "Vault Factory",
    address: "0xb12f2ad9eb04b721355c0ea4999189e7bc95e9e4",
    bscscan: "https://bscscan.com/address/0xb12f2ad9eb04b721355c0ea4999189e7bc95e9e4",
  },
  {
    name: "Safe Batch Helper",
    address: "0x10d893b26d91ef38b17df0ed595cf38d30d5bc1b",
    bscscan: "https://bscscan.com/address/0x10d893b26d91ef38b17df0ed595cf38d30d5bc1b",
  },
  {
    name: "Pull Price Adapter",
    address: "0xf0ee1442c3197be86b6a3c6456ea225a5575b2e3",
    bscscan: "https://bscscan.com/address/0xf0ee1442c3197be86b6a3c6456ea225a5575b2e3",
  },
  {
    name: "Fixed Price Adapter",
    address: "0xbc8660d8c7a99ea51eb90c224af91a831d7a264a",
    bscscan: "https://bscscan.com/address/0xbc8660d8c7a99ea51eb90c224af91a831d7a264a",
  },
];

async function rpcCall(method: string, params: unknown[]): Promise<unknown> {
  const res = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    }),
  });
  if (!res.ok) throw new Error(`RPC HTTP ${res.status}`);
  const json = (await res.json()) as { result?: unknown; error?: { message: string } };
  if (json.error) throw new Error(`RPC error: ${json.error.message}`);
  return json.result;
}

async function getCode(address: string): Promise<string> {
  const result = await rpcCall("eth_getCode", [address, "latest"]);
  return (result as string) || "0x";
}

async function getChainId(): Promise<number> {
  const result = await rpcCall("eth_chainId", []);
  return parseInt(result as string, 16);
}

async function main() {
  console.log("Yamata BNB Smart Chain Deployment Verification");
  console.log("==============================================");
  console.log(`RPC: ${RPC_URL}`);
  console.log("");

  // 1. Chain ID check
  const chainId = await getChainId();
  console.log(`Chain ID reported: ${chainId}`);
  if (chainId !== EXPECTED_CHAIN_ID) {
    console.error(`FAIL: Expected chainId ${EXPECTED_CHAIN_ID}, got ${chainId}`);
    process.exit(1);
  }
  console.log("✓ Chain ID matches BNB Smart Chain mainnet (56)");
  console.log("");

  // 2. Verify each core contract has deployed code
  let allOk = true;
  console.log("Core Yamata contract bytecode check:");
  console.log("------------------------------------");

  for (const c of CORE_YAMATA_CONTRACTS) {
    const code = await getCode(c.address);
    const deployed = code !== "0x" && code.length > 2;
    const status = deployed ? "✓ DEPLOYED" : "✗ MISSING";
    if (!deployed) allOk = false;
    console.log(`${status}  ${c.name.padEnd(22)} ${c.address}`);
    console.log(`         ${c.bscscan}`);
    console.log("");
  }

  if (!allOk) {
    console.error("FAIL: One or more expected Yamata contracts are not deployed at the listed addresses on BNB.");
    process.exit(1);
  }

  console.log("✓ All core Yamata contracts have deployed bytecode on BNB Smart Chain.");
  console.log("");
  console.log("This repository + on-chain verification demonstrates official Yamata BNB deployment.");
  console.log("See README.md for full contract list (Yamata vs external).");
}

main().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
