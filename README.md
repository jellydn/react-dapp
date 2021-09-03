# Welcome to react-dapp 👋

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000)
[![Twitter: jellydn](https://img.shields.io/twitter/follow/jellydn.svg?style=social)](https://twitter.com/jellydn)

> Dapp example with react (vitejs)

## 🏠 [Homepage](https://github.com/jellydn/react-dapp)

### ✨ [Demo](https://dapp-demo.productsway.com/)

## Screenshot

![https://gyazo.com/c6f068b6fe3e94bfe80d042639784faf.gif](https://gyazo.com/c6f068b6fe3e94bfe80d042639784faf.gif)

## Install

```sh
yarn install
```

## Built with

- New-Web-App cli https://github.com/jellydn/new-web-app
- [Hardhat](https://hardhat.org/) with [TypeChain](https://github.com/ethereum-ts/TypeChain) integration https://github.com/ethereum-ts/TypeChain/tree/master/packages/hardhat

## Develop

### Step 1: Deploy smart contract on local node

Open 1st terminal, then run below command

```sh
npx hardhat node
# or
yarn local-node
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
# Deploy localhost
npx hardhat run scripts/deploy.js --network localhost
# Or
yarn compile-node
```

You will get the deploy address from CLI. For example:

```sh
npx hardhat run scripts/deploy.js --network localhost
Generating typings for: 0 artifacts in dir: src/types for target: ethers-v5
Successfully generated 3 typings!
Successfully generated 3 typings for external artifacts!
Greeter deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
Token deployed to: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
```

### Step 2: Run react app

Create `.env` from `.env.example` from root directory. Remember to fill the value for deployed addresses.

```sh
# .env
VITE_GREETER_ADDRESS=
VITE_TOKEN_ADDRESS=

# Fill below information if you want to deploy to Mainnet/Testnet
ROPSTEN_PROVIDER_URL=
RINKEBY_PROVIDER_URL=
MNEMONIC=

# Verify smart contract on EtherScan
ETHERSCAN_API=
```

Then run below command

```sh
yarn dev
```

## Deploy to Ropsten Testnet

- Sign up and earn [$100 in credit](https://alchemy.com/?r=9ae3d9f1-56c4-476e-9f7e-23387e0e166a) on alchemy. More detail [here](https://docs.alchemy.com/alchemy/introduction/referral-program).

- Send some ETH to your wallet https://faucet.dimensions.network/

```sh
# Compile smart contract and generate types for typescript
npx hardhat compile
#
npx hardhat run scripts/deploy.js --network ropsten
```

- Verify contract

```sh
npx hardhat verify --network ropsten VITE_GREETER_ADDRESS 'Hello, Hardhat!'
```

You might have something similar

```sh
npx hardhat verify --network ropsten 0x0608Cc0b2970729f4577Eae89403cAE3049C1525  'Hello, Hardhat!'
Nothing to compile
Generating typings for: 0 artifacts in dir: src/types for target: ethers-v5
Successfully generated 3 typings!
Successfully generated 3 typings for external artifacts!
Compiling 1 file with 0.8.4
Successfully submitted source code for contract
contracts/Greeter.sol:Greeter at 0x0608Cc0b2970729f4577Eae89403cAE3049C1525
for verification on Etherscan. Waiting for verification result...

Successfully verified contract Greeter on Etherscan.
https://ropsten.etherscan.io/address/0x0608Cc0b2970729f4577Eae89403cAE3049C1525#code
```

```sh
npx hardhat verify --network ropsten 0x2Bce4076C8EE3facddC3325FfA4314B854d9447b 1000000 'ERC20 Demo Token' 18 'EDT'
Nothing to compile
Generating typings for: 0 artifacts in dir: src/types for target: ethers-v5
Successfully generated 3 typings!
Successfully generated 3 typings for external artifacts!
Compiling 1 file with 0.8.4
Successfully submitted source code for contract
contracts/Token.sol:StandardToken at 0x2Bce4076C8EE3facddC3325FfA4314B854d9447b
for verification on Etherscan. Waiting for verification result...

Successfully verified contract StandardToken on Etherscan.
https://ropsten.etherscan.io/address/0x2Bce4076C8EE3facddC3325FfA4314B854d9447b#code
```

## Author

👤 **Huynh Duc Dung**

- Website: https://productsway.com/
- Twitter: [@jellydn](https://twitter.com/jellydn)
- Github: [@jellydn](https://github.com/jellydn)

## Stargazers 🌟

[![Stargazers repo roster for jellydn/react-dapp](https://reporoster.com/stars/jellydn/react-dapp)](https://github.com/jellydn/react-dapp/stargazers)

## Show your support

Give a ⭐️ if this project helped you!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Q5Q61Q7YM)

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
