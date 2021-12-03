FROM node:alpine
<<<<<<< HEAD
WORKDIR /code
COPY package.json ./
COPY package-lock.json ./
=======
WORKDIR '/code'
COPY package.json .
COPY package-lok.json .
>>>>>>> fafa5b1c9910599200d2528c654ded015cae39b4
RUN npm install
RUN npm install react-scripts@
EXPOSE 8081
COPY . ./
CMD ["npm", "start"]