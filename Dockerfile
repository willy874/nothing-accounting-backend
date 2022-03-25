FROM node:16.14

WORKDIR /app

COPY ./package.json .

RUN npm install

RUN chown -R node /app/node_modules

USER node

COPY . .
