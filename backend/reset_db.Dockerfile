FROM node:alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npx", "ts-node", "-r", "tsconfig-paths/register", "--project", "test_data/tsconfig.json", "test_data/reset_test_data.ts"]
