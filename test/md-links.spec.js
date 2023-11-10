const path = require('path');
const isAbsolutePath = require('../lib/mdLinks');
const convertToAbsolutePath = require('../lib/mdLinks'); 
const doesFileExist = require('../lib/mdLinks'); 
const mdLinks = require('../lib/mdLinks'); 
const exp = require('constants');
const fs = require('fs').promises;

//const mdLinks = require('../lib/mdLinks');
//const { isAbsolutePath, convertToAbsolutePath } = require('../lib/mdLinks');
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

describe('convertToAbsolutePath', () => {
  it('Debería retornar la ruta absoluta si es relativa', () => {
    const relativePath = 'test/pruebastest/testFile.md';
    const absolutePath = path.resolve(relativePath);
    expect(convertToAbsolutePath(relativePath)).toEqual(absolutePath);
  });
});

describe('isAbsolutePath', () => {
  it('debería retornar la misma ruta si es absoluta', () => {
    const absolutePath = 'C:/Users/LOREN/DEV010-md-links/test/pruebastest/testFile.md';
    expect(isAbsolutePath(absolutePath)).toEqual(absolutePath);
  });
});

describe('doesFileExist', () => {
  it('deberia resolver true si el archivo existe', async () => {
    const fileExist = 'C:/Users/LOREN/DEV010-md-links/test/pruebastest/testFile.md';
    try {
      const result = await doesFileExist(fileExist);
      expect(result).toBe(true);
    } catch (error) {
      fail('La promesa debería resolverse, pero se rechazó');
    }
  });

  it('Deberia rechazar con un error si el archivo no existe', async () => {
    const notFileExist = 'ruta/inexistente/al/archivo.txt';
    try {
      await doesFileExist(notFileExist);
      fail('La promesa debería rechazarse');
    } catch (error) {
      expect(error instanceof Error).toBe(true);
      // Aquí debes ajustar el mensaje según lo que devuelve tu función doesFileExist
      // Esperas 'The path does not exist', pero esto depende de la implementación real de tu función
      expect(error.message).toBe('El archivo no existe.');
    }
  });
});



 

