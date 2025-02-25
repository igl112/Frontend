#Etapa 1: Construcción de la aplicación Angular (Node.js)
FROM node:18.19 AS dev-deps
WORKDIR /angular

COPY package.json package-lock.json ./

RUN npm install 

FROM node:18.19 AS builder
WORKDIR /angular

COPY --from=dev-deps /angular/node_modules /angular/node_modules

COPY . .

RUN npm run build --prod

FROM nginx:latest AS prod
EXPOSE 80
COPY --from=builder /angular/dist/angular /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]