// script.js
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const documentoId = document.getElementById("documentoId");
const salida = document.getElementById("salida");

const API_URL = "http://localhost:8080/api";

// Función para mostrar respuestas
function mostrarResultado(resultado) {
  salida.textContent = typeof resultado === "string" ? resultado : JSON.stringify(resultado, null, 2);
}

// Insertar
document.getElementById("insertar").addEventListener("click", async () => {
  if (!nombre.value || !correo.value) {
    return mostrarResultado("Todos los campos son obligatorios.");
  }

  try {
    const res = await fetch(`${API_URL}/insertar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombre.value, correo: correo.value }),
    });
    const data = await res.json();
    mostrarResultado(data);
  } catch (error) {
    mostrarResultado("Error al insertar");
  }
});

// Buscar
document.getElementById("buscar").addEventListener("click", async () => {
  if (!documentoId.value) return mostrarResultado("Debes ingresar un ID");

  try {
    const res = await fetch(`${API_URL}/buscar/${documentoId.value}`);
    const data = await res.json();
    mostrarResultado(data);
  } catch (error) {
    mostrarResultado("Error al buscar");
  }
});

// Actualizar
document.getElementById("actualizar").addEventListener("click", async () => {
  if (!documentoId.value || !nombre.value || !correo.value) {
    return mostrarResultado("Todos los campos e ID son requeridos");
  }

  try {
    const res = await fetch(`${API_URL}/actualizar/${documentoId.value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombre.value, correo: correo.value }),
    });
    const data = await res.json();
    mostrarResultado(data);
  } catch (error) {
    mostrarResultado("Error al actualizar");
  }
});

// Eliminar
document.getElementById("eliminar").addEventListener("click", async () => {
  if (!documentoId.value) return mostrarResultado("Debes ingresar un ID");

  try {
    const res = await fetch(`${API_URL}/borrar/${documentoId.value}`, { method: "DELETE" });
    const data = await res.json();
    mostrarResultado(data);
  } catch (error) {
    mostrarResultado("Error al eliminar");
  }
});
