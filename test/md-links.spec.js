const mdLinks = require('../lib/mdLinks');
const { describe, it } = require('@jest/globals');

describe('mdLinks', () => {
  it('debería resolver un arreglo con 3 links para un archivo .md con 3 links', () => {
    return mdLinks('test/test/testFile.md').then((links) => {
      // Comprueba que el resultado sea un arreglo
      expect(Array.isArray(links)).toBe(true);
      // Comprueba que haya 3 links en el arreglo
      expect(links.length).toBe(3);
    });
  });

  it('debería rechazar la promesa si la ruta no existe', () => {
    return mdLinks('ruta/invalida.md').catch((error) => {
      // Comprueba que la promesa sea rechazada con el mensaje de error adecuado
      expect(error).toBe('La ruta no existe.');
    });
  });

  it('debería determinar que una ruta es absoluta', () => {
    const isAbsolute = mdLinks.isAbsolute('/path/to/some/file');
    expect(isAbsolute).toBe(true);
  });

  it('debería determinar que una ruta es relativa', () => {
    const isAbsolute = mdLinks.isAbsolute('../lib/mdLinks');
    expect(isAbsolute).toBe(false);
  });
});




 

