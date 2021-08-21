# Welcome to react-dapp 👋

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000)
[![Twitter: jellydn](https://img.shields.io/twitter/follow/jellydn.svg?style=social)](https://twitter.com/jellydn)

> Dapp example with react (vitejs)

## Install

```sh
yarn install
```

## Built with

- New-Web-App cli https://github.com/jellydn/new-web-app
- [Hardhat](https://hardhat.org/) with [TypeChain](https://github.com/ethereum-ts/TypeChain) integration https://github.com/ethereum-ts/TypeChain/tree/master/packages/hardhat

## Usage

### Step 1: Deploy smart contract on local node

Open 1st terminal, then run below command

```sh
npx hardhat node
```

For example, below is my result.

```sh
npx hardhat node
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========
Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

Next, compile and deploy to local node

```sh
# Compile smart contract and generate types for typescript
npx hardhat compile
#
npx hardhat run scripts/deploy.js --network localhost
```

You will get the deploy address from CLI. For example:

```sh
px hardhat run scripts/deploy.js --network localhost
Generating typings for: 0 artifacts in dir: src/types for target: ethers-v5
Successfully generated 3 typings!
Successfully generated 3 typings for external artifacts!
Greeter deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Step 2: Run react app

Create `.env.local` from `.env.example` from root directory. Remember to fill the value for deployed address.

```sh
# .env.local
VITE_GREETER_ADDRESS=0x5FC8d32690cc91D4c39d9d3abcBD16989F875707
VITE_TOKEN_ADDRESS=0x0165878A594ca255338adfa4d48449f69242Eb8F
```

Then run below command

```sh
yarn dev
```

## Author

👤 **Huynh Duc Dung**

- Website: https://productsway.com/
- Twitter: [@jellydn](https://twitter.com/jellydn)
- Github: [@jellydn](https://github.com/jellydn)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
