FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++ build-base

COPY package*.json ./

RUN npm install

RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 5001

CMD ["npm", "start"]
