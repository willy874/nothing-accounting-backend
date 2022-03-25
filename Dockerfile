FROM node:16.14

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

RUN chown -R node:node /app

USER node
