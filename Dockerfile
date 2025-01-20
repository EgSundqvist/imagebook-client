# Använd en lättvikts Node.js-bild som bas
FROM node:18-alpine AS build

# Ange arbetskatalog
WORKDIR /app

# Kopiera package.json och package-lock.json
COPY package.json package-lock.json ./

# Installera beroenden
RUN npm install

# Kopiera resten av applikationen
COPY . .

# Bygg applikationen
RUN npm run build

# Använd en lättvikts Nginx-bild för att servera den byggda applikationen
FROM nginx:alpine

# Kopiera byggresultatet från den tidigare steget
COPY --from=build /app/dist /usr/share/nginx/html

# Exponera port 80
EXPOSE 80

# Starta Nginx
CMD ["nginx", "-g", "daemon off;"]