FROM node:16-alpine

RUN apk update && apk add bash

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

EXPOSE 4173
CMD [ "/bin/bash", "-c", "pnpm prisma generate;pnpm run build;pnpm run preview" ]