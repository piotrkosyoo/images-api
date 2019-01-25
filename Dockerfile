FROM golang:alpine
RUN mkdir /go/src/images-api
ADD . /go/src/images-api
WORKDIR /go/src/images-api
EXPOSE 8081
CMD ["go", "run", "main/main.go"]
