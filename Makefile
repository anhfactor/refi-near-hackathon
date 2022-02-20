
ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))


setup:
	docker-compose build

start:
	docker-compose up -d

stop:
	docker-compose down || true

status:
	docker-compose ps

logs:
	docker-compose logs -f

pull:
	git pull || true

deploy-demo:
	scp contracts.json refi:~/refi/
	ssh refi "cd ~/refi && make pull build stop start"

