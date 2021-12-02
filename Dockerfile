FROM node:alpine
WORKDIR '/code'
COPY package.json .
COPY package-lok.json .
RUN npm install
COPY . .
CMD ["npm", "run", "start"]