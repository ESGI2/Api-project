const jwt = require('jsonwebtoken');
const { findUserById } = require('../services/user.service'); // Importez votre service utilisateur

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Token manquant' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });

    try {
      const user = await findUserById(decodedToken.userId); // Assurez-vous d'avoir une fonction findUserById dans votre service utilisateur
      if (!user) return res.status(401).json({ message: 'Utilisateur introuvable' });

      req.user = {
        id: user.id,
        username: user.username,
        // Autres attributs utilisateur que vous souhaitez inclure
      };

      // Vous pouvez également vérifier les autorisations ici et ajouter des informations au req.user en conséquence
      // Exemple : req.user.isAdmin = user.isAdmin;

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Erreur de l\'application' });
    }
  });
}

module.exports = {
  authenticateToken,
};
