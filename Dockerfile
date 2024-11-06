FROM node:22 AS builder

WORKDIR /app

COPY . .

RUN npm install --prefix ./app

RUN npm install --prefix ./server
RUN npm run build --prefix ./server

EXPOSE 3000

CMD ["npm", "run", "--prefix", "./server", "start"]

