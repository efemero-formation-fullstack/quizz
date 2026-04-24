FROM node:25-alpine

WORKDIR /usr/app

COPY . .

RUN npm install

EXPOSE 4200

CMD ["npm", "run", "start:dev"]
