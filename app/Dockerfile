FROM node:8.9.1

# Make env variables available at build time
ARG NODE_ENV
ENV NODE_ENV "$NODE_ENV"

# use changes to package.json to force Docker not to use the cache
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

# Prepare app directory
ADD . /usr/src/app

# Build the app
WORKDIR /usr/src/app
RUN npm run build
