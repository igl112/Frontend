#Etapa 1: Construcción de la aplicación Angular (Node.js)
FROM node:latest AS dev-deps
WORKDIR /angular

COPY package.json package.json ./

RUN npm install

FROM node:latest AS builder
WORKDIR /angular
COPY --from=dev-deps /angular/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:latest
RUN rm etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
COPY --from=builder /angular/dist/angular /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]