const mdLinks = require('./index');

const markdownFilePath = 'examples/ejemplo1.md'; 

const links = mdLinks.analyzeLinks(markdownFilePath);

console.log(links); 