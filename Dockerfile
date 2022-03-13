FROM node:16.14

WORKDIR /app

COPY ./package.json .

COPY npm install

USER node

COPY . .
