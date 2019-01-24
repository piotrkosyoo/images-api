FROM golang:alpine

ADD src /go/src/images-api/main/
ADD src/images /go/src/images-api/images/
WORKDIR /go/src/images-api/

EXPOSE 8080

CMD ["go", "run", "src/main.go"]

