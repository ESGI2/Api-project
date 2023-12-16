const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const secretKey = process.env.SECRET_KEY // Utilisez la variable d'environnement ou une clé par défaut
const connection = require('./backend/config/db');
const addUser = require('./add_user');
const loginUser = require('./loginUser');
const app = express();

// Utilisez le middleware bodyParser pour analyser le JSON
app.use(bodyParser.json());

// Connexion à la base de données
const db = connection.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL!');
});

// Création d'un nouvel utilisateur
app.post('/addUser', addUser); 
app.post('/loginUser', loginUser);

// Middleware pour vérifier le token JWT
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Route de connexion
app.post('/login', (req, res) => {
    // Vérifiez les informations d'authentification ici (par exemple, dans une base de données)
    const username = req.body.username;
    const user = { name: username };

    // Créez et signez un token JWT
    const token = jwt.sign(user, secretKey);
    res.json({ token });
});

app.listen(8000, () => {
  console.log(`Serveur en cours d'exécution`);
});
