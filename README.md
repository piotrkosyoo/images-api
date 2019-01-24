# images-api GO

[![Build Status](http://ec2-63-33-63-206.eu-west-1.compute.amazonaws.com/buildStatus/icon?job=images-api-pipeline)](http://ec2-63-33-63-206.eu-west-1.compute.amazonaws.com/buildStatus/icon?job=images-api-pipeline)

Simple golang project to run in docker container

Golang application build on Jenkins 


Version 0.0.1

Fix some problem with

sh "go env"

GOHOSTARCH="amd64"
GOHOSTOS="linux"
GOOS="linux"
GOPATH="/var/lib/jenkins/go"
GORACE=""
GOROOT="/usr/lib/golang"

Then create temp code in GOPATH it solve all problem with import packages

src/main.go:5:2: cannot find package  in any of:
/usr/lib/golang/src/ (from $GOROOT)
/var/lib/jenkins/go/src/(from $GOPATH)

Or you can use dockerfile to build declarative agent