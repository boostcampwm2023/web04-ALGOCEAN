FROM node:20 AS builder

WORKDIR /app
COPY . .
RUN yarn set version berry
RUN yarn install
RUN yarn prisma generate
RUN yarn build

FROM node:20-slim

#TODO: 이미지 최적화 필요
WORKDIR /app
ENV NODE_ENV production
RUN apt-get update -y && apt-get install -y openssl
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./.env
RUN yarn set version berry
RUN yarn install
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client
EXPOSE 3000

CMD ["yarn","start:debug"]