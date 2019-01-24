FROM golang:alpine

RUN mkdir /app
ADD bin/images-api-app /app
WORKDIR /app
CMD ["images-api-app"]
EXPOSE 8081
