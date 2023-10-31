const fetch = require('node-fetch');

function isLinkValid(link) {
  console.log(`Validando enlace: ${link.href}`);
  return fetch(link.href)
    .then((response) => {
      if (response.ok) {
        return {
          ...link,
          status: response.status,
          statusText: response.statusText,
          isValid: true,
        };
      } else {
        return {
          ...link,
          status: response.status,
          statusText: response.statusText,
          isValid: false,
        };
      }
    })
    .catch((error) => {
      console.error(`Error al validar enlace: ${link.href}`, error);
      return {
        ...link,
        isValid: false,
        error: error.message,
      };
    });
}

module.exports = isLinkValid;