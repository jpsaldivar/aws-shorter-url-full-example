FROM node:21.4.0-alpine3.18 AS base

WORKDIR /app

ADD package.json yarn.lock ./
RUN yarn install --frozen-lockfile

ADD . .

RUN yarn nest build @app/jpsr-shorter-url

ENV NODE_ENV production
RUN yarn install --frozen-lockfile && yarn cache clean


FROM node:21.4.0-alpine3.18

WORKDIR /app

COPY --from=base /app/jpsr-shorter-url .
COPY --from=base /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "main.js"]
