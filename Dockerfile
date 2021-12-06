FROM node:alpine
WORKDIR '/code'
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install react-scripts@
EXPOSE 8081
COPY . ./
CMD ["npm", "start"]