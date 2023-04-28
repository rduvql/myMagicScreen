FROM node:18.5.0-slim

WORKDIR /app

COPY /dist .

ENV NODE_ENV="production"

ENTRYPOINT [ "node", "server.js" ]
