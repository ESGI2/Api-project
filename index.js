const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();
const sequelize = require('./backend/config/db');
const Signin = require('./backend/models/signin.models');

// Middleware pour parser les requêtes POST
app.use(bodyparser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const signinRoute = require("./backend/routes/signin.route");
app.use("/signin", signinRoute);

// Synchronisez votre modèle avec la base de données
sequelize.sync().then(() => {
  console.log('La connexion à la base de données a été établie avec succès.');
  const port = 8000;
  app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
  });
}).catch((error) => {
  console.error('Erreur lors de la connexion à la base de données:', error);
});
