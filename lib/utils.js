const path = require('path');

// Convierte una ruta relativa a una ruta absoluta
function convertToAbsolutePath(filePath) {
  return path.resolve(filePath);
}

// Verifica si una ruta dada es una ruta absoluta
function isAbsolutePath(filePath) {
  return path.isAbsolute(filePath);
}

// Exporta las funciones como un objeto
module.exports = { convertToAbsolutePath, isAbsolutePath };