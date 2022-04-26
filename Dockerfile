FROM node

WORKDIR /app

COPY . .

COPY ./package.json /app/package.json

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "build/bundle.js"]
