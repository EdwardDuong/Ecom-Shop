FROM node:19.1.0-alpine

WORKDIR /app

COPY ./client/package.json ./
COPY ./client/package-lock.json ./
RUN npm install --force

COPY ./client ./

EXPOSE 3000

CMD ["npm", "start"]