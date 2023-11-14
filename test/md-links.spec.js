const { mdLinks, analyzeLinks, doesFileExist, getMdFilesInDirectory } = require('../lib/mdLinks');
const path = require('path');
const fs = require('fs').promises;
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
// Prueba para verificar que se rechace la promesa si la extensión no es .md
it('debería rechazar la promesa si la extensión no es .md', () => {
  // Ruta de un archivo que sabes que no es .md
  const nonMdFilePath = 'ruta/a/archivo.txt';

  // Llamada a la función mdLinks con la ruta no .md
  return mdLinks(nonMdFilePath).catch(error => {
    // Verificación de que la promesa fue rechazada con el mensaje de error esperado
    expect(error).toBe('La ruta no existe.');  // Corregir esta línea
  });
});

// Prueba para verificar que se rechace la promesa si la extensión no es .md
it('debería rechazar la promesa si la extensión no es .md', () => {
  // Ruta de un archivo que sabes que no es .md
  const nonMdFilePath = 'C:/Users/LOREN/DEV010-md-links/test/pruebastest';

  // Llamada a la función mdLinks con la ruta no .md
  return mdLinks(nonMdFilePath).catch(error => {
    // Verificación de que la promesa fue rechazada con el mensaje de error esperado
    expect(error).toBe('El archivo no es de tipo Markdown.');
  });
});

 


// Descripción de las pruebas para la función doesFileExist
describe('doesFileExist', () => {
  // Prueba para verificar si la función devuelve true cuando el archivo existe
  it('debería retornar true si el archivo existe', () => {
    // Ruta de un archivo que sabes que existe (puedes adaptar esto según tu estructura de archivos)
    const existingFilePath = 'test/pruebastest/testFile.md';

    // Llamada a la función doesFileExist con la ruta del archivo existente
    return doesFileExist(existingFilePath)
      .then(result => {
        // Verificación de que el resultado es true, indicando que el archivo existe
        expect(result).toBe(true);
      });
  });

  // Prueba para verificar si la función devuelve false cuando el archivo no existe
  it('debería retornar false si el archivo no existe', () => {
    // Ruta de un archivo que sabes que no existe (puedes adaptar esto según tu estructura de archivos)
    const nonExistingFilePath = 'ruta/inexistente/archivo.txt';

    // Llamada a la función doesFileExist con la ruta del archivo inexistente
    return doesFileExist(nonExistingFilePath)
      .then(result => {
        // Verificación de que el resultado es false, indicando que el archivo no existe
        expect(result).toBe(false);
      });
  });
});

// Descripción de las pruebas para la función getMdFilesInDirectory
describe('getMdFilesInDirectory', () => {
  // Prueba para verificar si la función devuelve una lista de archivos .md en un directorio
  it('debería retornar una lista de archivos .md en el directorio', () => {
    // Ruta de un directorio que contiene archivos .md (ajusta esto según tu estructura de archivos)
    const directoryPath = 'C:/Users/LOREN/DEV010-md-links/test/pruebastest';

    // Llamada a la función getMdFilesInDirectory con la ruta del directorio
    return getMdFilesInDirectory(directoryPath)
      .then(mdFiles => {
        // Verificación de que mdFiles es un array y contiene al menos un archivo .md
        expect(Array.isArray(mdFiles)).toBe(true);
        expect(mdFiles.length).toBeGreaterThan(0);

        // Verificación de que todos los elementos en mdFiles son rutas válidas de archivos .md
        mdFiles.forEach(filePath => {
          expect(path.isAbsolute(filePath)).toBe(true);
          expect(path.extname(filePath)).toBe('.md');
        });
      });
  });

  // 
});

describe('analyzeLinks', () => {
  // Prueba para verificar si la función maneja adecuadamente la lectura de un archivo
  it('debería analizar los enlaces en el archivo correctamente', () => {
    // Ruta de un archivo (ajusta esto según tu estructura de archivos)
    const filePath = 'ruta/del/archivo.md';

    // Contenido de ejemplo para el archivo
    const fileContent = `
      [Link 1](https://www.example.com)
      [Link 2](https://www.test.com)
      [Link 3](https://www.sample.com)
    `;

    // Mock para fs.readFile que simula la lectura exitosa del archivo
    jest.spyOn(fs, 'readFile').mockResolvedValue(fileContent);

    // Llamada a la función analyzeLinks con la ruta del archivo
    return analyzeLinks(filePath)
      .then(links => {
        // Verificación de que la función devuelve los enlaces esperados
        expect(links).toEqual([
          {
            href: 'https://www.example.com',
            text: 'Link 1',
            file: filePath
          },
          {
            href: 'https://www.test.com',
            text: 'Link 2',
            file: filePath
          },
          {
            href: 'https://www.sample.com',
            text: 'Link 3',
            file: filePath
          },
        ]);
      })
      .finally(() => {
        // Restaurar la implementación original de fs.readFile después de la prueba
        fs.readFile.mockRestore();
      });
  });

 
});