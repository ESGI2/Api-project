const jwt = require('jsonwebtoken');
const { getUserByToken } = require('../services/user.service'); // Importez votre service utilisateur

async function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    // On récup l'utilisateur associé au token
    const user = await getUserByToken(token);

    // On ajoute l'id et le role de l'utilisateur dans la requête
    req.user = user;

  } catch (error) {
    return res.status(403).json({ message: 'Token invalide' });
  }

  next();
}

module.exports = {
  authenticateToken,
};
