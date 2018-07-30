FROM mhart/alpine-node:10.7.0 as build
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install --production