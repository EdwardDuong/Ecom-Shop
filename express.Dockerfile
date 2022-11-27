FROM node:19.0.1-alpine

WORKDIR ./app

COPY ./Ecom-Shop-API/package.json ./
COPY ./Ecom-Shop-API/package-lock.json ./
RUN npm install

COPY ./Ecom-Shop-API ./

EXPOSE 5000

CMD ["npm", "start"]