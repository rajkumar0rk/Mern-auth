FROM node:24-alpine
RUN addgroup -S mern-group && adduser -S -D -G mern-group mern-user
USER mern-user
WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build
EXPOSE 3000
ENV PORT=3000


ENTRYPOINT ["npm","start"]

