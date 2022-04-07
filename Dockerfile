FROM node

WORKDIR /app

COPY . .

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "build/bundle.js"]
