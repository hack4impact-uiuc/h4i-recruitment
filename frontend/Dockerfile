FROM mhart/alpine-node:12.8.0
WORKDIR /usr/src/app
COPY package.json . 
COPY yarn.lock .
RUN yarn install
COPY . .