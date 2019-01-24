FROM golang:alpine

ADD code /go/src/images-api/main/
ADD code /go/src/images-api/images/
WORKDIR /go/src/images-api/

EXPOSE 8080

CMD ["go", "run", "src/main.go"]

