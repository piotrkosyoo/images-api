FROM golang:alpine

ADD ./main/ /go/src/images-api/main/
ADD src/app/images /go/src/images-api/images/
WORKDIR /go/src/images-api/

EXPOSE 8080

CMD ["go", "run", "src/main.go"]

