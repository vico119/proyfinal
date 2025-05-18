const express = require("express");
const { Pedido } = require("../models"); // Asegúrate de que models/pedido.js existe
const router = express.Router();

// Crear un pedido
router.post("/", async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los pedidos
router.get("/", async (req, res) => {
  const pedidos = await Pedido.findAll();
  res.json(pedidos);
});

// Obtener un pedido por ID
router.get("/:id", async (req, res) => {
  const pedido = await Pedido.findByPk(req.params.id);
  pedido ? res.json(pedido) : res.status(404).json({ error: "Pedido no encontrado" });
});

// Actualizar un pedido
router.put("/:id", async (req, res) => {
  const pedido = await Pedido.findByPk(req.params.id);
  if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });

  await pedido.update(req.body);
  res.json(pedido);
});

// Eliminar un pedido
router.delete("/:id", async (req, res) => {
  const pedido = await Pedido.findByPk(req.params.id);
  if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });

  await pedido.destroy();
  res.json({ mensaje: "Pedido eliminado" });
});

module.exports = router;
