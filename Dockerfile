FROM golang:alpine
RUN mkdir /go/src/images-api
ADD main/ /go/src/images-api/main
ADD client-api/ /go/src/images-api/client-api
WORKDIR /go/src/images-api
EXPOSE 8081

# install lib before start
RUN apk add --no-cache git
RUN go get -v github.com/lucasb-eyer/go-colorful


CMD ["go", "run", "main/main.go"]
