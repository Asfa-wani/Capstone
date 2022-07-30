FROM node:16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci
COPY . .
CMD [ "npm", "start" ]