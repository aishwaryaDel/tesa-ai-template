# 1. BUILD STAGE
# Diese Stage kompiliert TypeScript zu JavaScript
FROM node:20-alpine AS build

# Arbeitsverzeichnis im Container
WORKDIR /app

# package.json + tsconfig.json kopieren (reicht für npm install)
COPY package.json ./
COPY tsconfig.json ./

# Dependencies installieren (inkl. Dev-Dependencies, weil wir hier noch builden müssen)
RUN npm install

# Restlichen Code reinkopieren
COPY src ./src
COPY scripts ./scripts
COPY db ./db

# TypeScript nach dist/ bauen
RUN npm run build


# 2. RUNTIME STAGE
# Diese Stage enthält NUR das, was wir wirklich zur Laufzeit brauchen
FROM node:20-alpine AS runtime

WORKDIR /app

# package.json kopieren
COPY package.json ./

# Nur Produktions-Dependencies installieren (kein TypeScript mehr, kein ts-node-dev)
RUN npm install --omit=dev

# Den gebauten Code aus der ersten Stage übernehmen
COPY --from=build /app/dist ./dist

# Port, auf dem der Server laufen wird
ENV PORT=3001
EXPOSE 3001

# Startkommando für die API
CMD ["node", "dist/server.js"]
