

.PHONY: build
build:
	@php vendor/enjoys/docker_ws/bin/build
	@cp ./vendor/enjoys/docker_ws/docker-ws.phar docker-ws.phar