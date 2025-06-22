//TP de QSPA par Blaise Kabambu, Gestion des Livres - Kinshasa, le 29/05/2025
//Création des routes  pour connecter les microservices Utilisateurs et Livres
const axios = require('axios');
// Code pour le microservice Livres
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 3000;
const fs = require('fs');
// Chemin du fichier JSON pour stocker les livres

// Pour lire le JSON dans le corps des requêtes
app.use(express.json());

// Données en mémoire (pas encore de base de données)
let livres = [];
let id = 1;
// Charger les livres depuis le fichier JSON au démarrage
try {
  const data = fs.readFileSync('./livres.json', 'utf-8');
  livres = JSON.parse(data);
  if (livres.length > 0) {
    id = Math.max(...livres.map(l => l.id)) + 1;
  }
  console.log(`📘 ${livres.length} livre(s) chargé(s) depuis livres.json`);
} catch (err) {
  console.log("⚠️ Aucun fichier livres.json trouvé ou vide, on démarre avec une liste vide");
}

// ROUTES CRUD

// Créer un livre à enregistrer dans le fichier JSON
app.post('/livres', (req, res) => {
  const livre = {
    id: id++,
    titre: req.body.titre,
    auteur: req.body.auteur,
    utilisateurId: req.body.utilisateurId || null
  };
  livres.push(livre);
  sauvegarderLivres();
  res.status(201).json(livre);
});

// Lire tous les livres
app.get('/livres', (req, res) => {
  res.json(livres);
});

// Modifier un livre
app.put('/livres/:id', (req, res) => {
    const livreId = parseInt(req.params.id);
    const index = livres.findIndex(l => l.id === livreId);
    if (index !== -1) {
        livres[index] = { id: livreId, ...req.body };
        res.json(livres[index]);
    } else {
        res.status(404).json({ message: 'Livre non trouvé, veuillez vérifier l\'ID svp.' });
    }
});

// Supprimer un livre
app.delete('/livres/:id', (req, res) => {
    const livreId = parseInt(req.params.id);
    livres = livres.filter(l => l.id !== livreId);
    res.status(204).send();
});
//connexion avec le microservice Utilisateurs
app.get('/livres/utilisateurs/:id', async (req, res) => {
    const utilisateurId = req.params.id;
    try {
        const response = await axios.get(`http://localhost:3001/utilisateurs/${utilisateurId}`);
        const utilisateur = response.data;
        const livresUtilisateur = livres.filter(livre => String(livre.utilisateurId) === utilisateurId);
        res.json({ utilisateur, livres: livresUtilisateur });
    } catch (error) {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
});
// Lancer le serveur
app.listen(port, () => {
    console.log(`Microservice Livres démarré sur http://localhost:${port}`);
});

// Fonction pour sauvegarder les livres dans le fichier JSON
function sauvegarderLivres() {
  try {
    fs.writeFileSync('./livres.json', JSON.stringify(livres, null, 2), 'utf-8');
    console.log('✅ Livres sauvegardés dans livres.json');
  } catch (err) {
    console.error('❌ Erreur lors de la sauvegarde des livres :', err);
  }
}
