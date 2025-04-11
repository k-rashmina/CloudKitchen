FROM node:18
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5003
CMD ["node", "src/app.js"]
