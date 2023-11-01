const mdLinks = require('./lib/mdLinks.js');
const isLinkValid = require('./lib/validateLinks.js');
const colors = require('colors');


mdLinks('examples/ejemplo1.md')
  .then((links) => {
    const linkPromises = links.map((link) => isLinkValid(link));
    return Promise.all(linkPromises);
  })
  .then((linksWithStatus) => {
    console.table(linksWithStatus);
    // linksWithStatus.forEach((link, index) => {
    //   console.log(`Enlace ${index + 1}:`);
    //   console.log(`- Texto: ${link.text}`);
    //   console.log(`- URL: ${link.href}`);
    //   console.log(`- Válido: ${link.isValid}`);  
    //   if (!link.isValid) {
    //     console.log(`- Estado: ${link.status} ${link.statusText}`);
    //   }
    //   console.log('');
    // });
  })
  .catch((error) => {
    console.error(error);
  });