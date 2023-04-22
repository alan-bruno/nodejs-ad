const ad = require("../config/activeDirectory");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
//Método para autenticar usuários
exports.user_authenticate = async (req, res) => {
  const { username, password } = req.body;
  const token = jwt.sign({ username: username }, process.env.HASH, { expiresIn: '1m' });
  try {
    await ad.authenticate(username + "@" + process.env.DOMAIN_CONTROLLER, password,
      function (err, auth) {

        if (auth) {
          return res.status(200).json({
            validation: auth,
            accessToken: token,
            message: "Authenticated!",
          });
        }
        else {
          return res.status(401).send({
            accessToken: auth,
            message: "Authentication failed!",
            error: err
          });
        }
      });
  } catch (err) {
    return res.status(500).send({ message: "ERROR " + err });
  }
};