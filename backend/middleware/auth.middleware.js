const jwt = require('jsonwebtoken');
const { getUserById, isAdmin } = require('../services/user.service'); // Importez votre service utilisateur

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Token manquant' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });

    try {
      const user = await getUserById(decodedToken.userId); // Assurez-vous d'avoir une fonction findUserById dans votre service utilisateur
      if (!user) return res.status(401).json({ message: 'Utilisateur introuvable' });

      // On check si l'utilisateur est admin
      if (isAdmin(user.id) == True) {
        req.user.isAdmin = true;
      }

      // On met l'id de utilisateur dans une variable pour la prochaine fonction
      req.user.userId = user.id;

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Erreur de l\'application' });
    }
  });
}

module.exports = {
  authenticateToken,
};
