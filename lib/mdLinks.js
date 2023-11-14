/* eslint-disable no-unused-vars */
const fs = require('fs').promises;
const path = require('path');
const { convertToAbsolutePath, isAbsolutePath }  = require('./utils.js');


function doesFileExist(filePath) {
  return fs.access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

function getMdFilesInDirectory(directoryPath) {
  return fs.readdir(directoryPath)
    .then((files) => files.filter((file) => path.extname(file) === '.md'))
    .catch((error) => {
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

function analyzeLinks(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8')
      .then(data => {
        let regex = /\[(.*?)\]\((\S*?) ?('(.*?)')?\)/gs;
        let regexURL = /https*?:([^"')\s]+)/;
        let regexText = /\[(.*)\]/;
        const arrayLinks = data.match(regex);

        if (!arrayLinks) {
          resolve([]); // No hay enlaces en el archivo
          return;
        }

        const links = [];
        const uniqueLinks = new Set();

        arrayLinks.forEach((elem) => {
          if (elem !== undefined) {
            const matchURL = elem.match(regexURL);
            const matchText = elem.match(regexText);

            if (matchURL !== null && matchText !== null) {
              const linkKey = matchURL[0];

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

        resolve(links);
      })
      .catch((error) => reject(error));
  });
}

function mdLinks(directoryPath) {
  return new Promise((resolve, reject) => {
    if (isAbsolutePath(directoryPath)) {
      doesFileExist(directoryPath)
        .then((exists) => {
          if (!exists) {
            reject('La ruta no existe.');
          } else {
            const fileExtension = path.extname(directoryPath);
            if (fileExtension === '.md') {
              analyzeLinks(directoryPath)
                .then((links) => resolve(links))
                .catch((err) => reject(err));
            } else {
              getMdFilesInDirectory(directoryPath)
                .then((mdFiles) => {
                  const mdLinksPromises = mdFiles.map((mdFile) => analyzeLinks(path.join(directoryPath, mdFile)));
                  return Promise.all(mdLinksPromises);
                })
                .then((links) => resolve(links.flat())) // Flatten the array of arrays
                .catch((err) => reject(err));
            }
          }
        });
    } else {
      const absolutePath = convertToAbsolutePath(directoryPath);
      doesFileExist(absolutePath)
        .then((exists) => {
          if (!exists) {
            reject('La ruta no existe.');
          } else {
            const fileExtension = path.extname(absolutePath);
            if (fileExtension === '.md') {
              analyzeLinks(absolutePath)
                .then((links) => resolve(links))
                .catch((err) => reject(err));
            } else {
              getMdFilesInDirectory(absolutePath)
                .then((mdFiles) => {
                  const mdLinksPromises = mdFiles.map((mdFile) => analyzeLinks(path.join(absolutePath, mdFile)));
                  return Promise.all(mdLinksPromises);
                })
                .then((links) => resolve(links.flat())) // Flatten the array of arrays
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

module.exports = { doesFileExist, mdLinks, getMdFilesInDirectory };

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
