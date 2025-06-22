# Étape 1 : image de base
FROM node:18

# Étape 2 : dossier de travail
WORKDIR /app

# Étape 3 : copier les fichiers
COPY package*.json ./
RUN npm install

COPY . .

# Étape 4 : exposer le port
EXPOSE 3001

# Étape 5 : démarrer le microservice
CMD ["node", "index.js"]