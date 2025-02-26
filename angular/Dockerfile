#Etapa 1: Construcción de la aplicación Angular (Node.js)
FROM node:19.5.0-alpine AS dev-deps
WORKDIR /angular

COPY package.json package-lock.json ./

RUN npm install 

FROM node:19.5.0-alpine AS builder
WORKDIR /angular

COPY --from=dev-deps /angular/node_modules /angular/node_modules

COPY . .

RUN npm run build --prod

FROM nginx:latest AS prod
EXPOSE 80
COPY --from=builder /angular/dist/angular /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]