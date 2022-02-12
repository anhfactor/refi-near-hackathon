# Local Metis node setup 

## Requirements

- Docker
- Docker compose

## Reference

Based on https://docs.metis.io/metis-node/local-test-only-node

## Setup

Clone the repo 

`git clone https://github.com/MetisProtocol/mvm`

Install dependencies

```sh
cd mvm
yarn install && yarn clean && yarn build
```

Build local docker images

```sh
cd ops
docker-compose -f docker-compose-local.yml build
```

## Running

Start the service with 

`docker-compose -f docker-compose-local.yml up -d`

Stop it 

`docker-compose -f docker-compose-local.yml down`

To check services are up and running 

`docker-compose -f docker-compose-local.yml ps`

Or see logs

`docker-compose -f docker-compose-local.yml logs <service name>`

## Hardhat config

Add under `networks` this section

```javascript
localmetis: {
    url: `http://localhost:9545`,
    accounts: [],
    gasPrice: 0,
    ovm: true,
    chainId: 31337,
    ignoreRxList: ['openzeppelin4/*'],
},
```