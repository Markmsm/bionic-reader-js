# syntax=docker/dockerfile:1

# FROM node:18-alpine
FROM node:lts-alpine3.18
WORKDIR /app
COPY . .
CMD ["node", "./server.js"]
EXPOSE 8080