FROM node:4.4.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev libkrb5-dev
WORKDIR ./
ADD package.json ./package.json
RUN npm install
ADD . ./
