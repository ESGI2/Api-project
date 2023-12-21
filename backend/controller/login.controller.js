const LoginService = require('../services/login.service');

exports.postLogin = async (req, res) => {
  try {
    const { pseudo, password } = req.body;
    const apiKey = req.get('Authorization');

    const result = await LoginService.loginUser(pseudo, password, apiKey);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
};
