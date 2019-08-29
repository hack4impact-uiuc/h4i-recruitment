FROM node:latest
WORKDIR /usr/src/app
COPY package.json . 
COPY yarn.lock .
RUN yarn install
COPY . .