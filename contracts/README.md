# Hardhat Project setup

# Setup

Just add dependencies `yarn install`

# Deployments

- To deploy contracts in the testnet use `yarn run deploy:testnet <file>`
- To deploy contracts in the a local instance use `yarn run deploy:local <file>`

# Development environment

To use the local setup, use the Makefile in the root of the repository and copy the account addresses. Example:

```sh
# start the local network
make mvm/start
# copy account keys to build/local.keys
make mvm/extract-keys
```

To copy contracts addresses in `.env.*.local` use:
- local `yarn hardhat --config hardhat.config.local.ts export-contracts`
- testnet `yarn hardhat --config hardhat.config.testnet.ts export-contracts`

# Running

- Clean-up local files `yarn hardhat clean`
- Compile files `yarn hardhat compile`
- Run tests `yarn hardhat test`


Other commands

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
