FROM node:8.16

WORKDIR /usr/src/image-server
COPY . /usr/src/image-server

RUN npm install
RUN npm run build

WORKDIR /usr/src/image-server/dist

CMD ["npm", "start"] 

