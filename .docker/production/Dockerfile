FROM node:14.5.0-alpine3.11

WORKDIR /home/node/app
ENV NODE_ENV=production

COPY ./ ./
VOLUME /home/node/app/storage

RUN npm install

CMD [ "node", "index.js" ]