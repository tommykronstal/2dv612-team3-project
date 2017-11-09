FROM node

ADD package.json /tmp/package.json
RUN cd /tmp && npm install

ADD . /usr/src/app
WORKDIR /usr/src/app
CMD npm start
