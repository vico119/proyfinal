const express = require('express');
const router = express.Router();

const { getUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

console.log('getUsers:', getUser);
// Proteger esta ruta para que solo usuarios autenticados puedan acceder
router.get('/', authenticateToken, getUser);


module.exports = router;
