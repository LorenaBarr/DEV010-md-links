const mdLinks = require('../lib/mdLinks'); 

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
});

// eslint-disable-next-line no-undef
describe('mdLinks', () => {
  // eslint-disable-next-line no-undef
  it('debería resolver un arreglo vacío para un archivo .md sin links', () => {
    return mdLinks('test/test/testFile2.md').then((links) => {
      // Comprueba que el resultado sea un arreglo vacío
      // eslint-disable-next-line no-undef
      expect(links).toEqual([]);
    });
  });
});
