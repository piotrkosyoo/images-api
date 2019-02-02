#!/bin/bash
echo "Update image from target folder and restart container"

containers=$(docker ps -a -q)

if [[ -n "$containers" ]]; then
    echo "Stop all containers"
	docker stop $containers
	echo List stopped container
	docker ps --filter "status=exited"
	echo "Remove all containers"
	docker rm $containers
else
    echo "Containers skip remove "
fi

image=$(docker images yogibubu/images-api)

if [[ -n "$image" ]]; then
    echo "Delete images-api image"
	docker rmi $image
else
    echo "Image empty-skip remove"
fi

