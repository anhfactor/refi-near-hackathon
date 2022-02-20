# ReFI

## Contracts - Build & deploy this to aurora testnet first

See [contracts README](./contracts/README.md)

### Method 1: Build it as a seperate service for frontend and backend (we are using this for demo)
### Frontend

Start with `cd frontend && yarn dev`
* Demo in vercel: https://refi-near-hackathon.vercel.app/

### Backend

Start with `cd backend && yarn start`
* Demo in heroku: https://refi-backend.herokuapp.com/

### Method 2: Start with docker container

Use the Makefile in the root folder. 

**Commands**

- Setup with `make setup`
- Start `make start`
- Stop `make stop`
- Status `make status`
- Logs `make logs`

## Documentation

Documentation is available in the [docs](./docs) folder

