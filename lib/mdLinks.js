const fs = require('fs').promises;
const path = require('path');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

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
  console.log('Comienza analisis de enlaces baby');
  return fs.readFile(filePath, 'utf8')
    .then(data => {
      console.log('Contenido del archivo:', data);
      const tokens = md.parse(data, {});
      // console.log('Tokens analizados:', tokens);
      const links = [];

      let currentHref = null;
      let currentText = null;

      for (const token of tokens) {
        if (token.type === 'link_open') {
          currentHref = token.attrs.find(attr => attr[0] === 'href')[1];
        } else if (token.type === 'text' && currentHref !== null) {
          currentText = token.content;
          links.push({ href: currentHref, text: currentText});
          currentHref = null;
        }
      }
      console.log('Enlaces encontrados:', links);

      return links;
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
                console.log('Links procesados:', links);
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
                console.log('Links procesados:', links);
                resolve(links);
              })
              .catch((err) => reject(err));
          }
        });
    }
  });
}

module.exports = mdLinks;
