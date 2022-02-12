# ReFI

## Frontend

Start with `cd frontend && yarn dev`

## Backend

Start with `cd backend && yarn start`

## Contracts

See [contracts README](./contracts/README.md)

## Start a local Metis node

Use the Makefile in the root folder. 

**Commands**

- Setup with `make mvm/setup`
- Start `make mvm/start`
- Extract updated private keys for local deployment `make mvm/extract-keys`
- Show accounts list `make mvm/show-keys`
- Stop `make mvm/stop`
- Status `make mvm/status`
- Logs `make mvm/logs`

__Note:__ This will install in the `./mvm` folder. If you want to use the scripts in another directory use `REPO_PATH=<your path> make <command>`


## Documentation

Documentation is available in the [docs](./docs) folder

