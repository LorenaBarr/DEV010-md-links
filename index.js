const path = require('path');
const analyzeLinks = require('./lib/apps');

const relativePath = 'examples/ejemplo1.md';
const absolutePath = path.resolve(relativePath);

analyzeLinks(absolutePath)
  .then(links => {
    links.forEach((link, index) => {
      console.log(`Enlace ${index + 1}:`);
      console.log(`- Texto: ${link.text}`);
      console.log(`- URL: ${link.href}`);
      console.log('');
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });


console.log('Función analyzeLinks:', analyzeLinks);

module.exports = analyzeLinks;
