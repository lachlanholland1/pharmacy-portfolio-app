# syntax=docker/dockerfile:1

FROM node:latest 
ENV NODE_ENV=production
WORKDIR /usr/api
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --include dev
COPY . .
CMD ["npm", "start"]