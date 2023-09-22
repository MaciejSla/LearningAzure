FROM node:16-alpine

RUN apk update && apk add bash

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 4173
CMD [ "/bin/bash", "-c", "npx prisma generate;npm run build;npm run preview" ]