FROM golang:alpine
RUN mkdir /go/src/images-api
ADD main/ /go/src/images-api/main
ADD client-api/ /go/src/images-api/client-api
WORKDIR /go/src/images-api
EXPOSE 8081
CMD ["go", "run", "main/main.go"]
