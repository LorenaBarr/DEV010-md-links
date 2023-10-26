const fs = require('fs');
const marked = require('marked');

function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    console.log('Iniciando readFilePromise');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log('Ocurrió un error:', err);
        reject(err);
      } else {
        console.log('Leyendo archivo exitosamente');
        resolve(data);
      }
    });
  });
}

function analyzeLinks(filePath) {
  return readFilePromise(filePath)
    .then(markdownContent => {
      const tokens = marked.lexer(markdownContent);
      const links = [];

      for (const token of tokens) {
        if (token.type === 'link') {
          const href = token.href;
          const text = token.text;
          links.push({ href, text });
        }
      }

      return links;
    });
  

}
module.exports = analyzeLinks;
