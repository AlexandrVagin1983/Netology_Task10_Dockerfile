FROM node:21.6.1-alpine
WORKDIR /app

ARG NODE_ENV=production
COPY ./package*.json ./

RUN npm set strict-ssl false
RUN npm install

COPY ./src src/

CMD ["npm", "run", "server"]
