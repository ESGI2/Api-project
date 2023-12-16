const crypto = require('crypto');
const db = require('./backend/config/db');

function loginUser(req, res) {
  const { mail, password } = req.query;

  // Hasher le mot de passe en utilisant sha256 pour le comparer avec le mot de passe hashé stocké
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  const query = 'SELECT * FROM user WHERE mail = ? AND password = ?';
  db.query(query, [mail, hashedPassword], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erreur lors de la tentative de connexion.');
    }

    // Vérifier si un utilisateur avec l'e-mail et le mot de passe fournis existe
    if (results.length === 1) {
      const user = results[0];

      // Utiliser le jeton existant de l'utilisateur
      const existingToken = user.token;

      console.log(`Utilisateur ${user.prenom} connecté avec succès.`);

      return res.status(200).json({ message: 'Connexion réussie' });
    } else {
      return res.status(401).send('Adresse e-mail ou mot de passe incorrect.');
    }
  });
}

module.exports = loginUser;