const fs = require('fs');
const marked = require('marked');

function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
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
