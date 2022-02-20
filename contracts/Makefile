
DEPLOY?=testnet
SCRIPT?=

extract-contracts:
	yarn hardhat compile
	yarn hardhat --config hardhat.config.$(DEPLOY).ts export-contracts
accounts:
	yarn hardhat --config hardhat.config.$(DEPLOY).ts accounts
show-keys:
	yarn hardhat --config hardhat.config.$(DEPLOY).ts show-keys

deploy: deploy/001_stableCoin deploy/002_ownershipCreator deploy/003_fractionalizer deploy/004_swap deploy/005_lending
	echo "Copying NFT contract metadata"
	mkdir -p ../backend/data/tokens
	cp build/0.json ../backend/data/tokens

deploy/script:
	yarn run deploy:$(DEPLOY) scripts/$(SCRIPT).deploy.ts
	sleep 5

deploy/clean:
	rm -f build/contracts.json

testnet/extract-contracts:
	DEPLOY=testnet make extract-contracts
testnet/accounts:
	DEPLOY=testnet make accounts

testnet/deploy/001_stableCoin:
	DEPLOY=testnet SCRIPT=001_stableCoin make deploy/script
testnet/deploy/002_ownershipCreator:
	DEPLOY=testnet SCRIPT=002_ownershipCreator make deploy/script
testnet/deploy/003_fractionalizer:
	DEPLOY=testnet SCRIPT=003_fractionalizer make deploy/script
testnet/deploy/004_swap:
	DEPLOY=testnet SCRIPT=004_swap make deploy/script
testnet/deploy/005_lending:
	DEPLOY=testnet SCRIPT=005_lending make deploy/script

testnet/deploy: \
	testnet/deploy/001_stableCoin \
	testnet/deploy/002_ownershipCreator \
	testnet/deploy/003_fractionalizer \
	testnet/deploy/004_swap \
	testnet/deploy/005_lending