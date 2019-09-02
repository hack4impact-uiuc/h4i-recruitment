FROM node:12.9
WORKDIR /usr/src/app
COPY package.json . 
COPY yarn.lock .
RUN yarn install
COPY . .
