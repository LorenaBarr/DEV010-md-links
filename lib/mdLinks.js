/* eslint-disable no-unused-vars */
// Importa el módulo 'fs' para realizar operaciones de sistema de archivos de forma asíncrona
const fs = require('fs').promises;
// Importa el módulo 'path' para manejar rutas de archivos y directorios
const path = require('path');
// Importa funciones de utilidad desde el archivo 'utils.js'
const { convertToAbsolutePath, isAbsolutePath } = require('./utils.js');

// Función para verificar si un archivo existe en la ruta dada
function doesFileExist(filePath) {
  // Utiliza fs.access para verificar la existencia del archivo
  return fs.access(filePath, fs.constants.F_OK)
    .then(() => true)  // Si tiene éxito, el archivo existe (devuelve true)
    .catch(() => false);  // Si falla, el archivo no existe (devuelve false)
}

// Función para obtener una lista de archivos con extensión .md en un directorio dado
function getMdFilesInDirectory(directoryPath) {
  // Utiliza fs.readdir para obtener la lista de archivos en el directorio
  return fs.readdir(directoryPath)
    .then((files) => files.filter((file) => path.extname(file) === '.md'))  // Filtra solo los archivos con extensión .md
    .then((mdFiles) => {
      // Crea una lista de rutas completas para los archivos .md
      const mdFilesWithPaths = mdFiles.map((mdFile) => {
        const fullPath = path.join(directoryPath, mdFile);
        console.log('Ruta completa del archivo .md:', fullPath);
        return fullPath;
      });
      return mdFilesWithPaths;  // Devuelve la lista de rutas completas de archivos .md
    })
    .catch((error) => {
      // Si hay un error al leer el directorio, lanza una excepción con un mensaje de error
      throw new Error(`Error reading directory: ${error.message}`);
    });
}

// function analyzeLinks(filePath) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, 'utf8')
//       .then(data => {
//         let regex = /\[(.*?)\]\((\S*?) ?('(.*?)')?\)/gs;
//         let regexURL = /https*?:([^"')\s]+)/;
//         let regexText = /\[(.*)\]/;
//         const arrayLinks = data.match(regex);
//         const links = [];
//         const uniqueLinks = new Set(); // Conjunto para rastrear enlaces únicos

//         // console.log(arrayLinks);
//         arrayLinks.forEach((elem) => {
//           // console.log(elem ,56);
//           if (elem !== undefined) {
//             const matchURL = elem.match(regexURL);
//             const matchText = elem.match(regexText);
//             if (matchURL !== null && matchText !== null) {
//               // Comprobar si el enlace ya existe en enlaces únicos
//               const linkKey = matchURL[0];
//               if (!uniqueLinks.has(linkKey)) {
//                 links.push({
//                   href: matchURL[0],
//                   text: matchText[1],
//                   file: filePath
//                 });
//                 uniqueLinks.add(linkKey); // Agregar el enlace al conjunto de enlaces únicos
//               }
//             } else {
//               // Manejo de casos de errores específicos
//               if (elem.includes('](') && !elem.includes(')')) {
//                 links.push({
//                   href: 'Enlace incompleto',
//                   text: 'Enlace inválido',
//                   file: filePath
//                 });
//               } else if (!matchText && matchURL) {
//                 links.push({
//                   href: matchURL[0],
//                   text: 'Texto sin enlace',
//                   file: filePath
//                 });
//               } else if (!matchURL && matchText) {
//                 links.push({
//                   href: 'Enlace sin texto',
//                   text: matchText[1],
//                   file: filePath
//                 });
//               } else {
//                 links.push({
//                   href: 'Error no identificado',
//                   text: 'Error no identificado',
//                   file: filePath
//                 });
//               }
//             }
//           }
//         });
//         resolve(links);
//         // console.log(links);
//       });
//   });
// }

// Función para analizar enlaces en un archivo dado

function analyzeLinks(filePath) {
  // Retorna una nueva Promise para manejar operaciones asíncronas
  return new Promise((resolve, reject) => {
    // Lee el contenido del archivo
    fs.readFile(filePath, 'utf8')
      .then(data => {
        // Expresiones regulares para extraer enlaces y sus componentes
        let regex = /\[(.*?)\]\((\S*?) ?('(.*?)')?\)/gs;
        let regexURL = /https*?:([^"')\s]+)/;
        let regexText = /\[(.*)\]/;
        // Encuentra todos los enlaces en el contenido del archivo
        const arrayLinks = data.match(regex);

        // Si no hay enlaces, resuelve la Promise con un array vacío
        if (!arrayLinks) {
          resolve([]);
          return;
        }

        const links = [];
        const uniqueLinks = new Set();

        // Itera sobre cada enlace encontrado
        arrayLinks.forEach((elem) => {
          if (elem !== undefined) {
            // Extrae la URL y el texto del enlace utilizando las expresiones regulares
            const matchURL = elem.match(regexURL);
            const matchText = elem.match(regexText);

            // Si se encuentran la URL y el texto, crea un objeto de enlace y agrégalo a la lista
            if (matchURL !== null && matchText !== null) {
              const linkKey = matchURL[0];

              // Asegúrate de que el enlace sea único antes de agregarlo
              if (!uniqueLinks.has(linkKey)) {
                links.push({
                  href: matchURL[0],
                  text: matchText[1],
                  file: filePath
                });
                uniqueLinks.add(linkKey);
              }
            }
          }
        });

        // Resuelve la Promise con la lista de enlaces encontrados
        resolve(links);
      })
      .catch((error) => reject(error));  // Rechaza la Promise si hay un error en la lectura del archivo
  });
}

// Función principal que analiza enlaces en archivos Markdown (MD) en un directorio dado
function mdLinks(directoryPath) {
  // Retorna una nueva Promise para manejar operaciones asíncronas
  return new Promise((resolve, reject) => {
    // Verifica si la ruta proporcionada es una ruta absoluta
    if (isAbsolutePath(directoryPath)) {
      // Comprueba si el archivo en la ruta existe
      doesFileExist(directoryPath)
        .then((exists) => {
          // Si el archivo no existe, rechaza la Promise con un mensaje de error
          if (!exists) {
            reject('La ruta no existe.');
          } else {
            // Obtiene la extensión del archivo
            const fileExtension = path.extname(directoryPath);
            // Si la extensión es '.md', analiza los enlaces en ese archivo
            if (fileExtension === '.md') {
              analyzeLinks(directoryPath)
                .then((links) => resolve(links))
                .catch((err) => reject(err));
            } else {
              // Si la extensión no es '.md', obtiene la lista de archivos MD en el directorio
              getMdFilesInDirectory(directoryPath)
                .then((mdFiles) => {
                  // Para cada archivo MD, realiza el análisis de enlaces y recoge las Promises resultantes
                  const mdLinksPromises = mdFiles.map((mdFile) => analyzeLinks(mdFile));
                  // Ejecuta todas las Promises en paralelo y resuelve la Promise principal con los resultados (array de enlaces)
                  return Promise.all(mdLinksPromises);
                })
                .then((links) => resolve(links.flat())) // Aplana el array de arrays resultante
                .catch((err) => reject(err));
            }
          }
        });
    } else {
      // Si la ruta no es absoluta, conviértela a una ruta absoluta
      const absolutePath = convertToAbsolutePath(directoryPath);
      // Comprueba si el archivo en la ruta absoluta existe
      doesFileExist(absolutePath)
        .then((exists) => {
          // Si el archivo no existe, rechaza la Promise con un mensaje de error
          if (!exists) {
            reject('La ruta no existe.');
          } else {
            // Obtiene la extensión del archivo
            const fileExtension = path.extname(absolutePath);
            // Si la extensión es '.md', analiza los enlaces en ese archivo
            if (fileExtension === '.md') {
              analyzeLinks(absolutePath)
                .then((links) => resolve(links))
                .catch((err) => reject(err));
            } else {
              // Si la extensión no es '.md', obtiene la lista de archivos MD en el directorio
              getMdFilesInDirectory(absolutePath)
                .then((mdFiles) => {
                  // Para cada archivo MD, realiza el análisis de enlaces y recoge las Promises resultantes
                  const mdLinksPromises = mdFiles.map((mdFile) => analyzeLinks(mdFile));
                  // Ejecuta todas las Promises en paralelo y resuelve la Promise principal con los resultados (array de enlaces)
                  return Promise.all(mdLinksPromises);
                })
                .then((links) => resolve(links.flat())) // Aplana el array de arrays resultante
                .catch((err) => reject(err));
            }
          }
        });
    }
  });
}


// function mdLinks(filePath) {
//   console.log({ filePath });
//   return new Promise((resolve, reject) => {
//     if (isAbsolutePath(filePath)) {
//       doesFileExist(filePath)
//         .then((exists) => {
//           if (!exists) {
//             reject('La ruta no existe.');
//           } else {
//             const fileExtension = path.extname(filePath);
//             if (!isValidMarkdownExtension(fileExtension)) {
//               reject('El archivo no es de tipo Markdown.');
//             } else {
//               analyzeLinks(filePath)
//                 .then((links) => {
//                   console.log('Links procesados:', links);
//                   resolve(links);
//                 })
//                 .catch((err) => reject(err));
//             }
//           }
//         });
//     } else {
//       const absolutePath = convertToAbsolutePath(filePath);
//       doesFileExist(absolutePath)
//         .then((exists) => {
//           if (!exists) {
//             reject('La ruta no existe.');
//           } else {
//             if (!isValidMarkdownExtension(absolutePath)) {
//               reject('El archivo no es del tipo Markdown.');
//             } else {
//               analyzeLinks(absolutePath)
//                 .then((links) => {
//                   console.log('Links procesados:', links);
//                   resolve(links);
//                 })
//                 .catch((err) => reject(err));
//             }
//           }
//         });
//     }
//   });
//   function isValidMarkdownExtension(filePath) {
//     const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
//     const ext = path.extname(filePath);
//     return validExtensions.includes(ext);
//   }

// }

// Exporta un objeto que contiene las funciones como propiedades
module.exports = { doesFileExist, mdLinks, getMdFilesInDirectory, analyzeLinks };

/**
 * en CommonJS
 * 
 * Podemos exportar algo por defecto
 * module.exports = nombreDeAlgo //por defecto
 * 
 * const alguito = require('./rutadelarchivo');
 * 
 * Si son varias cosas a exportar
 * 
 *exportarlo como un objeto es mucho mejor
 module.exports = { primeraCosa, segundaCosa };

 y para importarlo tengo que respetar el nombre

 const { primeraCosa, segundaCosa} = require('./ruta');
 */
