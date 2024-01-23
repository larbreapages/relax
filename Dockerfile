FROM node:18 AS build

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn add mysql

FROM gcr.io/distroless/nodejs:18

COPY --from=build /app /app

WORKDIR /app

ENV NODE_ENV=production

CMD ["./node_modules/.bin/strapi", "start"]

EXPOSE 1337
