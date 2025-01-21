# Använd en lättvikts Node.js-bild som bas
FROM node:18-alpine AS build

# Ange arbetskatalog
WORKDIR /app

# Installera ca-certificates
RUN apk --no-cache add ca-certificates

# Kopiera package.json och package-lock.json
COPY package.json package-lock.json ./

# Installera beroenden
RUN npm install

# Kopiera resten av applikationen
COPY . .

# Ange byggargument
ARG VITE_USER_API_URL
ARG VITE_IMAGE_API_URL

# Sätt miljövariabler baserat på byggargument
ENV VITE_USER_API_URL=$VITE_USER_API_URL
ENV VITE_IMAGE_API_URL=$VITE_IMAGE_API_URL

# Bygg applikationen
RUN npm run build

# Använd en lättvikts Nginx-bild för att servera den byggda applikationen
FROM nginx:alpine

# Installera ca-certificates
RUN apk --no-cache add ca-certificates

# Kopiera byggresultatet från den tidigare steget
COPY --from=build /app/dist /usr/share/nginx/html

# Exponera port 80
EXPOSE 80

# Starta Nginx
CMD ["nginx", "-g", "daemon off;"]