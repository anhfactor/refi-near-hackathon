# Development environment setup

## Prerequisites

- node lts
- docker, docker-compose

## Install Dependencies

```sh
cd backend && yarn install
cd contracts && yarn install
cd frontend && yarn install
```

## Start local network

From repository root

```sh
make mvm/setup
make mvm/start
```

Once running, extract keys

```sh
make mvm/extract-keys
```

A file in `./contracts/build/local.keys` should have been created

## Contracts deployment

We are going to deploy contracts on the local instance. From the `contracts` folder run

```sh
make deploy
```

This will deploy the contracts and setup the accounts in order to properly performing the creation of certificate, swap and lending.

In case the command fails, re-run or run one by one

```sh
make deploy/001_stableCoin
make deploy/002_ownershipCreator
make deploy/003_fractionalizer
make deploy/004_swap
make deploy/005_lending
```

__Note__ A cache is built in `build/contracts.json`. By default deployment will skip existing contracts. To redeploy remove the file first!

Once completed, export the ABI and contracts reference to frontend with

```sh
make extract-contracts
```

## Start backend and frontend 

Start backend, will run on `localhost:5000`

```sh 
cd backend
yarn start
```

Start frontend, will run on `localhost:3000`

```sh 
cd frontend
yarn start
```

Happy hacking!