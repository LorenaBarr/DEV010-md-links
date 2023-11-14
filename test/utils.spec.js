const { convertToAbsolutePath, isAbsolutePath } = require('../lib/utils.js');




// Descripción de las pruebas para la función convertToAbsolutePath
describe('convertToAbsolutePath', () => {
  // Prueba para verificar si la función devuelve la ruta absoluta cuando se le proporciona una ruta relativa
  it('Debería retornar la ruta absoluta si es relativa', () => {
    // Ruta relativa de ejemplo
    const relativePath = 'test/pruebastest/testFile.md';

    // Ruta absoluta esperada para la ruta relativa proporcionada en el ejemplo
    const absolutePath = 'C:\\Users\\LOREN\\DEV010-md-links\\test\\pruebastest\\testFile.md';

    // Llamada a la función convertToAbsolutePath con la ruta relativa
    const resultPath = convertToAbsolutePath(relativePath);

    // Verificación de que el resultado coincide con la ruta absoluta esperada
    expect(resultPath).toEqual(absolutePath);
  });
});

// Descripción de las pruebas para la función isAbsolutePath
describe('isAbsolutePath', () => {
  // Prueba para verificar si la función devuelve true cuando se le proporciona una ruta absoluta
  it('debería retornar true si es absoluta', () => {
    // Ruta absoluta de ejemplo
    const absolutePath = 'C:\\Users\\LOREN\\DEV010-md-links\\test\\pruebastest\\testFile.md';

    // Llamada a la función isAbsolutePath con la ruta absoluta
    const result = isAbsolutePath(absolutePath);

    // Verificación de que el resultado es true, indicando que la ruta es absoluta
    expect(result).toBe(true);
  });
});


