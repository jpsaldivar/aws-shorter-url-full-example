FROM node:21.4.0-alpine3.18

WORKDIR /app

COPY ./dist/jpsr-shorter-url-front/.next ./.next
COPY ./dist/jpsr-shorter-url-front/public ./public
COPY ./dist/jpsr-shorter-url-front/next.config.js ./next.config.js
COPY ./dist/jpsr-shorter-url-front/package.json ./package.json

# Uncomment the following line if working on an M1 mac
# RUN apk add --no-cache python3 g++ make

RUN yarn

EXPOSE 3000

CMD ["node", "-r", "./telemetry/src/lib/tracing", "./node_modules/.bin/next", "start"]
