const express = require("express"); // Importa Express para manejar rutas
const { Cliente } = require("../models"); // Importa el modelo Cliente desde la carpeta models
const router = express.Router(); // Crea un router de Express

// Crear un nuevo cliente
router.post("/", async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body); // Crea un cliente con los datos enviados en la petición
    res.status(201).json(cliente); // Devuelve el cliente creado con código 201 (Created)
  } catch (error) {
    res.status(400).json({ error: error.message }); // Manejo de errores en caso de datos incorrectos
  }
});

// Obtener todos los clientes
router.get("/", async (req, res) => {
  const clientes = await Cliente.findAll(); // Busca todos los clientes en la BD
  res.json(clientes); // Devuelve la lista de clientes en formato JSON
});

// Obtener un cliente por ID
router.get("/:id", async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id); // Busca un cliente por su ID
  cliente ? res.json(cliente) : res.status(404).json({ error: "Cliente no encontrado" }); // Devuelve error si no existe
});

// Actualizar un cliente
router.put("/:id", async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id); // Busca el cliente por ID
  if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" }); // Si no existe, envía error

  await cliente.update(req.body); // Actualiza el cliente con los nuevos datos
  res.json(cliente); // Devuelve el cliente actualizado
});

// Eliminar un cliente
router.delete("/:id", async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id); // Busca el cliente por ID
  if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" }); // Si no existe, envía error

  await cliente.destroy(); // Elimina el cliente de la base de datos
  res.json({ mensaje: "Cliente eliminado" }); // Devuelve mensaje de éxito
});

module.exports = router; // Exporta el router para ser usado en index.js
