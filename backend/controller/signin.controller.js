const signinService = require('../services/signin.service.js');

exports.postSignIn = async (req, res) => {
  try {
    const { pseudo, password } = req.body;

    // Vérifier que pseudo et password sont définis
    if (!pseudo || !password) {
      return res.status(400).json({ message: 'Pseudo ou mot de passe sont obligatoires.' });
    }

    const { newUser, userToken } = await signinService.createUser(pseudo, password);

    res.status(201).json({ message: 'Compte créé avec succès', user: newUser, token: userToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur à la création du compte' });
  }
};
