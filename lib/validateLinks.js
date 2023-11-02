const fetch = require('node-fetch');


const chalk = require('chalk');

function isLinkValid(link) {
  console.log(chalk.cyan(`Validando enlace: ${link.href}`));
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
        if (response.status === 404) {
          console.error(chalk.red(`Error al validar enlace: ${link.href}`), error);
          return {
            ...link,
            status: response.status,
            statusText: response.statusText,
            isValid: false,
            isBroken: true, 
          };
        } else {
          return {
            ...link, 
            status: response.status,
            statusText: response.statusText,
            isValid: false,
            isBroken: false, 
          };
        }
      }
    })
    .catch((error) => {
      console.error(chalk.red(`Error al validar enlace: ${link.href}`), error);
      return {
        ...link,
        isValid: false,
        isBroken: true,
        error: error.message,
      };
    });
}

module.exports = isLinkValid;