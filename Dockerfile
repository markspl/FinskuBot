# FinskuBot docker image

FROM node:18-alpine3.16

WORKDIR /finskubot
COPY package.json ./
RUN npm install

COPY . ./