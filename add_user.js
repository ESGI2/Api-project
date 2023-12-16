const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = process.env.SECRET_KEY;
const db = require('./backend/config/db');

function addUser(req, res) {
  const { nom, prenom, mail, password } = req.query;

  // Vérifier si l'e-mail est déjà utilisé
  const checkEmailQuery = 'SELECT * FROM user WHERE mail = ?';
  db.query(checkEmailQuery, [mail], (checkErr, checkResults) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).send("Erreur lors de la vérification de l'e-mail.");
    }
  
    if (checkResults.length > 0) {
      return res.status(400).send("L'e-mail est déjà utilisé.");
    }

    // L'e-mail n'est pas déjà utilisé, continuer avec l'ajout de l'utilisateur
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const role = "client";
    const token = jwt.sign({ sub: nom, role: role }, secretKey);

    const insertUserQuery = 'INSERT INTO user (nom, prenom, mail, password, role, token) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(insertUserQuery, [nom, prenom, mail, hashedPassword, role, token], (insertErr, results) => {
      if (insertErr) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur:', insertErr);
        return res.status(500).send('Erreur lors de la création du user.');
      }

      console.log('Utilisateur inséré avec succès:', results);

      const userId = results.insertId;
      const updateTokenQuery = 'UPDATE user SET token = ? WHERE id = ?';
      db.query(updateTokenQuery, [token, userId], (updateErr) => {
        if (updateErr) {
          console.error('Erreur lors de la mise à jour du token:', updateErr);
          return res.status(500).send('Erreur lors de la mise à jour du token.');
        }

        console.log('Token mis à jour avec succès.');

        res.status(201).send('Utilisateur créé avec succès.');
      });
    });
  });
}

module.exports = addUser;
