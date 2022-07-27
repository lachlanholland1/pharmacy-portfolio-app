# syntax=docker/dockerfile:1

FROM node:latest AS buildstage
WORKDIR /build
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --include dev
COPY . .
RUN npm run build

FROM nginx:stable
COPY --from=buildstage /build/dist /usr/share/nginx/html
COPY --from=buildstage /build/server/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]