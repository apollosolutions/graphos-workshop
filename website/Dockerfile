FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm run build

COPY . .

EXPOSE 4000

CMD ["node", "app.js"]
