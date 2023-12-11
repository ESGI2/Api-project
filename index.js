// Initialition de l'api express
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connection = require('./backend/config/db');

// Connexion à la base de données
const db = connection.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL!');
});

// Importation des routes
const userRoute = require("./backend/routes/user.route");
app.use("/user", userRoute);

const appartementRoute = require("./backend/routes/appartement.route");
app.use("/appartement", appartementRoute);

// Lancement du serveur
app.listen(8000, () => {
  console.log('Le serveur a bien démarré au port 8000');
});

// Middleware pour parser les requêtes POST
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));