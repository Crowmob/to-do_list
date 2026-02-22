FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon   # ← add this line

COPY . .

EXPOSE 5000

CMD ["nodemon", "src/server.js"]