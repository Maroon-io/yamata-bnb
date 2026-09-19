# Yamata BNB Smart Chain Integration

**Official BNB Smart Chain integration and deployment repository for Yamata.**

Yamata is a credit and aggregation layer for prediction markets. This repository contains the public integration code, network configuration, contract address registry and production deployment references for Yamata on BNB Smart Chain (chain ID 56).

**Yamata's proprietary application, backend systems, risk systems, liquidation logic, pricing mechanisms and smart-contract implementation code are maintained separately in private repositories and are not contained in this repository.**

## BNB Smart Chain

- **Network**: BNB Smart Chain Mainnet
- **Chain ID**: 56
- **Native asset**: BNB
- **Explorer**: https://bscscan.com
- **Public RPCs** (used by this package for verification): `https://bsc-dataseed.binance.org`, `https://bsc.publicnode.com`

## Production Deployment

All addresses below are verified deployed on BNB Smart Chain mainnet as of the latest snapshot.

### YAMATA CONTRACTS (Yamata-owned / Yamata-deployed)

| Contract            | Address                                      | BscScan |
|---------------------|----------------------------------------------|---------|
| Presage             | `0xc2eaa0778dc629bd69b905727482792742c06ea7` | https://bscscan.com/address/0xc2eaa0778dc629bd69b905727482792742c06ea7 |
| PriceHub            | `0x1b24678acf29e25889dab8492b78d472b06c46fa` | https://bscscan.com/address/0x1b24678acf29e25889dab8492b78d472b06c46fa |
| Guardian Pool       | `0x7b65d2fc63f6d3893b4d68e8fdb4cf5208d1f637` | https://bscscan.com/address/0x7b65d2fc63f6d3893b4d68e8fdb4cf5208d1f637 |
| Vault (MetaMorpho)  | `0x3130b99Edf12FF619a870D2640687d00AF62103E` | https://bscscan.com/address/0x3130b99Edf12FF619a870D2640687d00AF62103E |
| Vault Factory       | `0xb12f2ad9eb04b721355c0ea4999189e7bc95e9e4` | https://bscscan.com/address/0xb12f2ad9eb04b721355c0ea4999189e7bc95e9e4 |
| Wrapper Factory     | `0xaaad78e30516f6584a048a19bb3771f9b7d4281f` | https://bscscan.com/address/0xaaad78e30516f6584a048a19bb3771f9b7d4281f |
| Safe Batch Helper   | `0x10d893b26d91ef38b17df0ed595cf38d30d5bc1b` | https://bscscan.com/address/0x10d893b26d91ef38b17df0ed595cf38d30d5bc1b |
| Pull Price Adapter  | `0xf0ee1442c3197be86b6a3c6456ea225a5575b2e3` | https://bscscan.com/address/0xf0ee1442c3197be86b6a3c6456ea225a5575b2e3 |
| Fixed Price Adapter | `0xbc8660d8c7a99ea51eb90c224af91a831d7a264a` | https://bscscan.com/address/0xbc8660d8c7a99ea51eb90c224af91a831d7a264a |
| Verifier            | `0xd05ebfdd877e37fa4a66763175b16ad4e3fc4fcf` | https://bscscan.com/address/0xd05ebfdd877e37fa4a66763175b16ad4e3fc4fcf |

### EXTERNAL / INTEGRATION CONTRACTS (NOT Yamata)

These are third-party contracts that Yamata integrates with on BNB. They are listed for completeness and reference only.

| Contract                  | Address                                      | Note |
|---------------------------|----------------------------------------------|------|
| Morpho Blue               | `0x01b0Bd309AA75547f7a37Ad7B1219A898E67a83a` | External (Morpho) |
| IRM (Adaptive Curve)      | `0x7112D95cB5f6b13bF5F5B94a373bB3b2B381F979` | External (Morpho) |
| USDT                      | `0x55d398326f99059fF775485246999027B3197955` | External token |
| predict.fun CTF (standard)| `0x22DA1810B194ca018378464a58f6Ac2B10C9d244` | External (predict.fun venue) |
| Safe Singleton            | `0x5be481E3858454DdFD8E45702B52C90559cc75fd` | External (Safe) |
| Safe Proxy Factory        | `0xef4C89216d3b663ff387bd606891a7546D954FAf` | External (Safe) |
| EntryPoint 4337           | `0xb55FFeE150553987e198B4d3aEEDE9BdD471284d` | External (ERC-4337) |

Full list and additional Safe modules (One-click, timelock, etc.) are in `config/bnb-mainnet.json` and `src/addresses.ts`.

## Technology

- Blockchain: BNB Smart Chain (chain ID 56)
- Contracts: Solidity (deployed UUPS / proxy pattern for upgradable components)
- Integration package: TypeScript
- Primary read client support: viem (optional peer), ethers, or raw JSON-RPC

## Repository Scope

This repository is intentionally limited to Yamata's public BNB integration surface:

- Network constants
- Production address registry (categorized)
- Deployment verification tooling
- Public configuration for integrators and verifiers

**Proprietary application code, backend systems, risk engine, liquidation logic, pricing adapters beyond the public interfaces, solver strategies, and smart contract implementation source are maintained in private repositories.**

No Presage implementation source is present here.

## Verification

A reviewer looking only at this repository (plus public BscScan) can confirm Yamata is deployed on BNB:

```bash
npm install
npm run verify:bnb
```

Expected output (abridged):

```
Yamata BNB Smart Chain Deployment Verification
==============================================
✓ Chain ID matches BNB Smart Chain mainnet (56)

Core Yamata contract bytecode check:
✓ DEPLOYED  Presage                 0xc2eaa0778dc629bd69b905727482792742c06ea7
         https://bscscan.com/address/0xc2eaa0778dc629bd69b905727482792742c06ea7
...
✓ All core Yamata contracts have deployed bytecode on BNB Smart Chain.
```

The script:
- Connects to public BNB RPC (no API key)
- Asserts `eth_chainId` === 56
- Calls `eth_getCode` for every core Yamata contract
- Exits non-zero if any is missing (0x)
- Prints direct BscScan links

You can also manually verify any address on https://bscscan.com.

## Usage (TypeScript / viem example)

```ts
import { bnbMainnet, YAMATA_CONTRACTS } from "@maroon-io/yamata-bnb";
import { createPublicClient, http } from "viem";

const client = createPublicClient({
  chain: bnbMainnet as any, // or import { bsc } from "viem/chains"
  transport: http(),
});

const presage = YAMATA_CONTRACTS.presage.address;
// Use client.readContract with public ABIs from BscScan if needed.
console.log("Presage on BNB:", presage);
```

## Links

- Yamata: https://yamata.pm
- App: https://app.yamata.pm
- X: https://x.com/yamatadotio
- GitHub org: https://github.com/Maroon-io
- Audit (QuillAudits): https://github.com/Quillhash/QuillAudit_smart_contract_audit_Reports/blob/master/Yamata%20-%20Presage%20Smart%20Contract%20Audit%20Report%20-%20QuillAudits.pdf

## License / Notice

See NOTICE file. This package publishes only non-sensitive public deployment metadata and integration helpers. No rights are granted to Yamata's proprietary technology or implementation.
