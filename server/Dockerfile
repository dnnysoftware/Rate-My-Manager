FROM node

WORKDIR /server

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . ./

EXPOSE 5500

CMD [ "npm", "start" ] 