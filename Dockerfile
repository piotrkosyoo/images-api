FROM golang:alpine

ADD ./main/ /go/src/images-api/main/
ADD ./images/ /go/src/images-api/images/
WORKDIR /go/src/images-api/

ENV PORT=8080
CMD ["go", "run", "main/main.go"]