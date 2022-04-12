FROM node:alpine

COPY package.json .

RUN npm install\
    && npm install typescript -g

COPY . .

RUN tsc

EXPOSE 8080

CMD ["node", "./dist/index.js"]