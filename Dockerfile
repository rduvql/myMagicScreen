FROM node:16-slim

WORKDIR /app

COPY /dist .

ENV NODE_ENV="production"

ENTRYPOINT [ "node", "server.js" ]
