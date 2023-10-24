const fs = require('fs');
const marked = require('marked');

function analyzeLinks (markdownFilePath) {
  // Leer el contenido del archivo Markdown
  const markdownContent = fs.readFileSync(markdownFilePath, 'utf8');

  // Utilizar marked para convertir el contenido Markdown a tokens
  const tokens = marked.lexer(markdownContent);

  // Realizar el análisis de enlaces y devolverlos
  const links = [];

  for (const token of tokens) {
    if (token.type === 'link') {
      const href = token.href;
      const text = token.text;
      links.push({ href, text });
    }
  }

  return links;
}

module.exports = {
  analyzeLinks
};
