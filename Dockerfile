FROM golang:alpine

RUN mkdir /app
ADD bin/images-api-app /app
WORKDIR /app
EXPOSE 8081
CMD ["/app/images-api-app"]