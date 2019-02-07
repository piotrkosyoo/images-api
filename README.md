# images-api

## Example app with golang and javascript, build on jenkins and run on docker

:beers: :wink:

[![Build Status](http://ec2-34-241-76-172.eu-west-1.compute.amazonaws.com/buildStatus/icon?job=images-api-pipeline)](http://ec2-34-241-76-172.eu-west-1.compute.amazonaws.com/buildStatus/icon?job=images-api-pipeline)

Simple golang project to run in docker container

Golang application build on Jenkins 

## Run on docker

_To using  app you need install below software_

```ruby
docker
npm 
node
golang
```

* Build UI before in clinet-api folder run npm script "build"
* Call script "sh docker-stop-remove-containers" in root folder

## Run without  docker

_You need installed:_
```ruby
npm 
node
golang
```

* Compile and run rile main.go in main folder
* Run dev-server for UI application "npm run start"

## Demo

Available on page

[images-api](http://ec2-34-241-76-172.eu-west-1.compute.amazonaws.com/client-api/)

_![](http://ec2-34-241-76-172.eu-west-1.compute.amazonaws.com/api/test/mandelbrot)_
_![](http://ec2-34-241-76-172.eu-west-1.compute.amazonaws.com/api/test/mandelbrot?zoom=5&ShiftX=-1211&ShiftY=-14)_


:beers:
