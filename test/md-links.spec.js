const mdLinks = require('../lib/mdLinks');
const analyzeLinks = require('../lib/mdLinks');
const doesFileExist = require('../lib/mdLinks');
const { describe, it } = require('@jest/globals');

//test de mdlinks devuelve el array
describe('mdLinks', () => {
  it('debería resolver un arreglo con 3 links para un archivo .md con 3 links', () => {
    return mdLinks('test/test/testFile.md').then((links) => {
      // Comprueba que el resultado sea un arreglo
      expect(Array.isArray(links)).toBe(true);
      // Comprueba que haya 3 links en el arreglo
      expect(links.length).toBe(3);
    });
  });
  //rechaza la promesa si la ruta no existe
  it('debería rechazar la promesa si la ruta no existe', () => {
    return mdLinks('ruta/invalida.md').catch((error) => {
      expect(error).toBe('La ruta no existe.');
    });
  });
});
//hasta aca pasan los test :(


describe('doesFileExist', () => {
  it('debería resolver true si el archivo existe', async () => {
    const fileExist = 'C:/Users/LOREN/DEV010-md-links/test/pruebastest/testFile.md';
    try {
      const result = await doesFileExist(fileExist);
      expect(result).toBe(true);
    } catch (error) {
      fail('La promesa debería resolverse, pero se rechazó');
    }
  });

  it('Debería rechazar con un error si el archivo no existe', async () => {
    const notFileExist = 'ruta/inexistente/al/archivo.txt';
    try {
      await doesFileExist(notFileExist);
      fail('La promesa debería rechazarse');
    } catch (error) {
      expect(error instanceof Error).toBe(true);
      expect(error.message).toBe('El archivo no existe.');
    }
  });
});





describe('analyzeLinks', () => {
  it('debería analizar correctamente los enlaces en un archivo', async () => {
    const filePath = path.resolve(__dirname, 'testFile.md');
    const result = await analyzeLinks(filePath);


    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('href');
    expect(result[0]).toHaveProperty('text');
    expect(result[0]).toHaveProperty('file');
  });


});


// Construir la ruta completa al archivo 'testFile.md' usando '__dirname'
//const filePath = path.resolve(__dirname, 'testFile.md');

// 'path.resolve' combina '__dirname' con 'testFile.md' para obtener la ruta completa
// '__dirname' proporciona la ruta del directorio que contiene el script actual
// 'filePath' ahora contiene la ruta completa al archivo 'testFile.md'

