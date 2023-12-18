const signinService = require('../services/signin.service');

exports.postSignIn = async (req, res) => {
  try {
    const { pseudo, password } = req.body;

    const result = await signinService.createUser(pseudo, password);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    const { newUser, userToken } = result;

    res.status(201).json({ message: 'Compte créé avec succès', user: newUser, token: userToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur à la création du compte' });
  }
};
