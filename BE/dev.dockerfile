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
COPY --from=builder /app/. .
RUN yarn set version berry
RUN yarn install
EXPOSE 3000

CMD ["yarn","start:prod"]