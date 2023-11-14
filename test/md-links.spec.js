const { mdLinks, analyzeLinks, doesFileExist } = require('../lib/mdLinks');
const path = require('path');
const { describe, it } = require('@jest/globals');

//test de mdlinks devuelve el array
describe('mdLinks', () => {
  it('debería resolver un arreglo con 3 links para un archivo .md con 3 links', () => {
    return mdLinks('test/pruebastest').then((links) => {
      // Comprueba que el resultado sea un arreglo
      expect(Array.isArray(links)).toBe(true);
      // Comprueba que haya 3 links en el arreglo
      expect(links.length).toBe(3);
    });
  });
});