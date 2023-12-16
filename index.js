// Initialition de l'api express
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const sequelize = require('./backend/config/db');

// Connexion à la base de données
sequelize.sync().then(() => {
  console.log('La connexion à la base de données a été établie avec succès.');
  const port = 8000;
  app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
  });
}).catch((error) => {
  console.error('Erreur lors de la connexion à la base de données:', error);
});

// Importation des routes
const userRoute = require("./backend/routes/user.route");
app.use("/user", userRoute);

const appartementRoute = require("./backend/routes/appartement.route");
app.use("/appartement", appartementRoute);

// Middleware pour parser les requêtes POST
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));