// api.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 8080;
const MONGO_URI = "mongodb://localhost:27017/crm";

// Middleware
app.use(cors());
app.use(express.json());

// Esquema y modelo
const clienteSchema = new mongoose.Schema({
  nombre: String,
  correo: String
});

const Cliente = mongoose.model("Cliente", clienteSchema);

// Conexión a MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión:", err));

// Rutas de API

// Insertar
app.post("/api/insertar", async (req, res) => {
  try {
    const nuevo = new Cliente(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: "Error al insertar", detalle: err });
  }
});

// Buscar por ID
app.get("/api/buscar/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ error: "No encontrado" });
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
});

// Actualizar por ID
app.put("/api/actualizar/:id", async (req, res) => {
  try {
    const actualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ error: "No encontrado" });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: "Error al actualizar" });
  }
});

// Borrar por ID
app.delete("/api/borrar/:id", async (req, res) => {
  try {
    const borrado = await Cliente.findByIdAndDelete(req.params.id);
    if (!borrado) return res.status(404).json({ error: "No encontrado" });
    res.json({ mensaje: "Eliminado correctamente" });
  } catch (err) {
    res.status(400).json({ error: "Error al eliminar" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor API escuchando en http://localhost:${PORT}`);
});
