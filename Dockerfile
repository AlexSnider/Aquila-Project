FROM node:21.7.3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3005

CMD ["npm", "start"]
