# Stage 1: Build der React/Vite App
FROM node:20-alpine AS build

# Arbeitsverzeichnis im Container
WORKDIR /app

# package.json und lockfiles zuerst kopieren (Caching für npm install)
COPY package*.json ./

# Dependencies installieren
RUN npm install

# Restlichen Code kopieren
COPY . .

# Production Build erzeugen (Vite legt Output in /app/dist)
RUN npm run build


# Stage 2: Auslieferung über nginx (statischer Webserver)
FROM nginx:alpine AS runtime

# Wir löschen die default nginx Website-Konfiguration und legen unsere rein
# (Standardmäßig lauscht nginx auf Port 80)
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Jetzt kopieren wir die fertigen Build-Assets aus Stage 1 nach /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html

# Expose Port 80 für Azure Container Apps / Ingress
EXPOSE 80

# nginx im Vordergrund laufen lassen
CMD ["nginx", "-g", "daemon off;"]
