const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'El correo ya está registrado' });

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'Usuario registrado', user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    // Verificar contraseña
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    // Generar JWT
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('Tipo:', typeof process.env.JWT_SECRET);
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, 
      {
      expiresIn: '1h',
    });

    res.json({ message: 'Login exitoso', token, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

module.exports = { register, login };
