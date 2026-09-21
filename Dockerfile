FROM node:18

WORKDIR /app

COPY . .

WORKDIR /app/reactapp
RUN npm install
RUN npm run build

WORKDIR /app/backend
RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]