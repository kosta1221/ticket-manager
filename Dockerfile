FROM node:14 as base

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm install

COPY . .

WORKDIR /app/client

RUN npm install

RUN npm run build

EXPOSE 8080

WORKDIR /app

CMD ["npm","start"]