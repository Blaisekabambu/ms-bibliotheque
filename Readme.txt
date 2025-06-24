# 📚 Projet de microservices - Bibliothèque

Développé par **les étudiants L1 M1 Informatique (Blaise Kabambu, Gaelle Masolokele, Patrick Mukeba, José Ntono, Charly Shako) année 2024-2025**

Ce projet contient 2 microservices (`livres` et `utilisateurs`) et une interface web, tous conteneurisés avec Docker.

---

## ⚙️ Prérequis

- Avoir **Docker Desktop** installé : https://www.docker.com/products/docker-desktop
- Savoir ouvrir un terminal dans le dossier du projet

---

## 🚀 Lancer l'application

Dans un terminal, placer-vous dans le dossier `Ms-bibliotheque` (là où se trouve le fichier `docker-compose.yml`) puis exécutez :

Terminal
docker compose up --build

Accès aux services

| Service                   | URL d'accès                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| Interface Web             | [http://localhost:4000](http://localhost:4000)                           |
| Microservice Livres       | [http://localhost:4003/livres](http://localhost:4003/livres)             |
| Microservice Utilisateurs | [http://localhost:4002/utilisateurs](http://localhost:4002/utilisateurs) |


Fonctionnalités de l'interface

Dans cette application, vous pouvez :

Afficher tous les livres

Ajouter un nouveau livre

Afficher tous les utilisateurs

Ajouter un nouvel utilisateur

Arborescence du travail


Ms-bibliotheque/
├── docker-compose.yml
├── README.txt
├── ms-livres/
│   ├── index.js
│   ├── livres.json
│   └── Dockerfile
├── ms-utilisateurs/
│   ├── index.js
│   ├── utilisateurs.json
│   └── Dockerfile
├── interface-web/
│   ├── index.html
│   └── Dockerfile

Arrêter l'application

Terminal: 
Docker compose down

Bonus

Tester les microservices avec Thunder Client

Vous pouvez également utiliser Thunder Client (extension VS Code) ou Postman pour interagir directement avec les microservices.

Voici les principales requêtes possibles : Get, Post, Put, Delete (CRUD)

Livres – sur http://localhost:4003/livres
Utilisateurs – sur http://localhost:4002/utilisateurs

Contact: 
Si vous avez des questions, appeler au 081 94 41 102 (Blaise Kabambu, chef de groupe)

Kinshasa, le 23/06/2025

