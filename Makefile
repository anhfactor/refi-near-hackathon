
ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
REPO_PATH?=./mvm
OPS_PATH=$(REPO_PATH)/ops

mvm/clear:
	rm -rf $(REPO_PATH) || true

mvm/setup/install:
	cd $(REPO_PATH) && yarn install && yarn clean && yarn build

mvm/setup/build:
	cd $(OPS_PATH) && docker-compose -f docker-compose-local.yml build

mvm/setup: mvm/setup/clone mvm/setup/install mvm/setup/build
	exit 0

mvm/start:
	cd $(OPS_PATH) && \
	docker-compose -f docker-compose-local.yml up -d

mvm/stop:
	cd $(OPS_PATH) && \
	docker-compose -f docker-compose-local.yml down || true

mvm/status:
	cd $(OPS_PATH) && \
	docker-compose -f docker-compose-local.yml ps

mvm/logs:
	cd $(OPS_PATH) && \
	docker-compose -f docker-compose-local.yml logs -f

mvm/show-keys:
	docker logs ops_l1_chain_1 | head -n 100| \
	sed -e 's/l1_chain_1         | //' | \
	grep "Account #" -A 1

mvm/extract-keys:
	mkdir -p $(ROOT_DIR)/contracts/build
	docker logs ops_l1_chain_1 | head -n 100| \
	sed -e 's/l1_chain_1         | //' | \
	grep "Private Key" | \
	sed -e 's/Private Key: //g' > $(ROOT_DIR)/contracts/build/local.keys

pull:
	git pull || true

build:
	docker-compose build
start:
	docker-compose up -d
stop:
	docker-compose down

deploy-demo:
	scp contracts.json refi:~/refi/
	ssh refi "cd ~/refi && make pull build stop start"

