//TP de QSPA par Blaise Kabambu, Gestion des Livres - Kinshasa, le 29/05/2025
// Code pour le microservice Utilisateurs
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 3000;
const fs = require('fs');

app.use(express.json());

let utilisateurs = [];
let id = 1;
//fonction pour sauvegarder les utilisateurs dans le fichier JSON
function sauvegarderUtilisateurs() {
  fs.writeFileSync('./utilisateurs.json', JSON.stringify(utilisateurs, null, 2), 'utf-8');
}
// Charger les utilisateurs depuis le fichier JSON
try {
  const data = fs.readFileSync('./utilisateurs.json', 'utf-8');
  utilisateurs = JSON.parse(data);
  if (utilisateurs.length > 0) {
    id = Math.max(...utilisateurs.map(u => u.id)) + 1;
  }
  console.log(`👤 ${utilisateurs.length} utilisateur(s) chargé(s) depuis utilisateurs.json`);
} catch (err) {
  console.log("⚠️ Aucun fichier utilisateurs.json trouvé ou vide, on démarre avec une liste vide");
}
// Créer un utilisateur
app.post('/utilisateurs', (req, res) => {
    const utilisateur = { id: id++, ...req.body };
    utilisateurs.push(utilisateur);
    sauvegarderUtilisateurs();
    console.log(`👤 Utilisateur créé: ${utilisateur.id} - ${utilisateur.nom}`);
    res.status(201).json(utilisateur);
});

// Lire tous les utilisateurs
app.get('/utilisateurs', (req, res) => {
    res.json(utilisateurs);
});

// Lire un utilisateur par ID
app.get('/utilisateurs/:id', (req, res) => {
    const utilisateur = utilisateurs.find(u => u.id === Number(req.params.id));
    utilisateur ? res.json(utilisateur) : res.status(404).send('Utilisateur non trouvé');
});

// Mettre à jour un utilisateur
app.put('/utilisateurs/:id', (req, res) => {
    const index = utilisateurs.findIndex(u => u.id === Number(req.params.id));
    if (index !== -1) {
        utilisateurs[index] = { id: utilisateurs[index].id, ...req.body };
        res.json(utilisateurs[index]);
    } else {
        res.status(404).send('Utilisateur non trouvé');
    }
});

// Supprimer un utilisateur
app.delete('/utilisateurs/:id', (req, res) => {
    const index = utilisateurs.findIndex(u => u.id === Number(req.params.id));
    if (index !== -1) {
        utilisateurs.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Utilisateur non trouvé');
    }
});

app.listen(port, () => {
    console.log(`Microservice utilisateurs en écoute sur http://localhost:${port}`);
});
