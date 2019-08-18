FROM mhart/alpine-node:12.8.0
WORKDIR /usr/src/app
# Copy over the module files separately so that they're cached as a build layer
# (i.e. no rebuild necessary if these don't change) 
COPY package.json . 
COPY yarn.lock .
RUN yarn install
COPY . .

