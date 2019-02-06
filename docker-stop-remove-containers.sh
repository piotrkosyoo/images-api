#!/bin/bash
echo "Update image from target folder and restart container"

containers=$(docker ps -a -q)

if [[ -n "$containers" ]]; then
    echo "Stop container $containers"
	docker stop "$containers"
	docker ps --filter "status=exited"
	echo "Remove container $containers"
	docker rm "$containers"
else
    echo "Containers skip remove "
fi

image=$(docker images yogibubu/images-api)

if [[ -n "$image" ]]; then
    echo "Delete images-api $image"
	docker rmi "$image"
else
    echo "Image empty-skip remove"
fi

