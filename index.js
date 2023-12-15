const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { sequelize } = require('./models/reservation.model.js');
const { Reservation } = require('./models/reservation.model');
const reservationController = require('./backend/controllers/reservation.controller');


const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Base de données synchronisée');
  } catch (error) {
    console.error('Erreur lors de la synchronisation de la base de données:', error);
  }
};


// Middleware pour le corps de la requête
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pour vérifier le jeton d'authentification
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Accès non autorisé' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Le jeton n\'est pas valide' });

    req.user = user;
    next();
  });
}

// Routes
app.get('/api/user/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Routes Res
app.get('/api/reservation', reservationController.getAllReservations);
app.get('/api/reservation/:reservationId', reservationController.getReservationById);
app.post('/api/reservation', authenticateToken, reservationController.createReservation);

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API !');
});

// Lancement du serveur
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Le serveur a bien démarré au port ${port}`);
});

// Fonction pour récupérer les informations de l'utilisateur
async function getUserById(userId) {
  try {
    //Sequelize
    const user = await User.findByPk(userId);

    if (!user) {
      return null;
    }
    const formattedUser = {
      id: user.id,
      nom: user.nom,
      role: user.role,
    };

    return formattedUser;
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de la récupération des informations de l\'utilisateur.');
  }
}

