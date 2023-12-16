const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = process.env.SECRET_KEY;
const db = require('./backend/config/db');

function addUser(req, res) {
  const { nom, prenon, mail, password } = req.query;

  // Hasher le mot de passe en utilisant sha256
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  // Créer et signer un token JWT avec des informations minimales (par exemple, le rôle de l'utilisateur)
  const role = "client";
  const token = jwt.sign({ sub: nom, role: role }, secretKey);

  const query = 'INSERT INTO user (nom, prenon, mail, password, role, token) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [nom, prenon, mail, hashedPassword, role, token], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erreur lors de la création du user.');
    }

    // Stocker le token généré dans la base de données
    const userId = results.insertId;
    const updateTokenQuery = 'UPDATE user SET token = ? WHERE id = ?';
    db.query(updateTokenQuery, [token, userId], (updateErr) => {
      if (updateErr) {
        console.error(updateErr);
        return res.status(500).send('Erreur lors de la mise à jour du token.');
      }

      res.status(201).send('Utilisateur créé avec succès.');
    });
  });
}

module.exports = addUser;