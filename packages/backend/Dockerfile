FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

COPY . .

EXPOSE 3001
# build app for production with minification
RUN npm run start

# CMD [ "http-server", "./index.ts" ]