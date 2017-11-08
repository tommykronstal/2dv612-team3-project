FROM node

# Prepare app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app

# Install dependencies
WORKDIR /usr/src/app
RUN npm install

# Build the app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the app
CMD npm start
