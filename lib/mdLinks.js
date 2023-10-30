const fs = require('fs').promises;
const path = require('path');
const marked = require('marked');

function isAbsolutePath(filePath) {
  return path.isAbsolute(filePath);
}

function convertToAbsolutePath(filePath) {
  return path.resolve(filePath);
}

function doesFileExist(filePath) {
  return fs.access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

function analyzeLinks(filePath) {
  return fs.readFile(filePath, 'utf8')
    .then(data => {
      console.log(data, 'Leyendo el archivo exitosamente');
      const tokens = marked.lexer(data); //revisar
      const links = [];

      for (const token of tokens) {
        if (token.type === 'link') {
          const href = token.href;
          const text = token.text;
          console.log('Encontrado enlace con texto:', text);
          console.log('Enlace con URL:', href);
          if (!href) {
            console.error('Enlace sin URL:', text);
          } else if (!text) {
            console.error('Texto sin enlace:', href);
          } else if (href.includes(' ')) {
            console.error('Enlace con espacio en blanco:', href);
          } else {
            links.push({ href, text });
          }
        }
      }

      console.log('Links encontrados:', links);
      return links;
    })
    .catch(error => {
      console.error('Ocurrió un error:', error);
      throw error;
    });
}


function mdLinks(filePath) {
  return new Promise((resolve, reject) => {
    if (isAbsolutePath(filePath)) {
      doesFileExist(filePath)
        .then((exists) => {
          if (!exists) {
            reject('La ruta no existe.');
          } else {
            analyzeLinks(filePath)
              .then((links) => {
                console.log('Links procesados:', links); // Agrega este console.log
                resolve(links);
              })
              .catch((err) => reject(err));
          }
        });
    } else {
      const absolutePath = convertToAbsolutePath(filePath);
      doesFileExist(absolutePath)
        .then((exists) => {
          if (!exists) {
            reject('La ruta no existe.');
          } else {
            analyzeLinks(absolutePath)
              .then((links) => {
                console.log('Links procesados:', links); // Agrega este console.log
                resolve(links);
              })
              .catch((err) => reject(err));
          }
        });
    }
  });
}

module.exports = mdLinks;