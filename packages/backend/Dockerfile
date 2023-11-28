FROM node:lts-alpine

# install simple http server for serving static content
WORKDIR /app
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
# install project dependencies
RUN npm install
COPY . .