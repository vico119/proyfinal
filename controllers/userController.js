const { User } = require('../models');

const getUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email'] // No enviar la contraseña
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

module.exports = { getUser };