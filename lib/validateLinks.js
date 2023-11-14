const fetch = require('node-fetch');


const chalk = require('chalk');

// function isLinkValid(link) {
//   console.log(chalk.cyan(`Validando enlace: ${link.href}`));
  
//   if (!link.href) {
//     return {
//       ...link,
//       isValid: false,
//       isBroken: true,
//       status: 'No URL',
//     };
//   }
  
//   return fetch(link.href)
//     .then((response) => {
//       if (response.ok) {
//         return {
//           ...link,
//           status: response.status,
//           statusText: response.statusText,
//           isValid: true,
//         };
//       } else {
//         if (response.status === 404) {
//           console.error(chalk.red(`Error 404 - Página no encontrada: ${link.href}`));
//           return {
//             ...link,
//             status: response.status,
//             statusText: response.statusText,
//             isValid: false,
//             isBroken: true, 
//           };
//         } else {
//           return {
//             ...link, 
//             status: response.status,
//             statusText: response.statusText,
//             isValid: false,
//             isBroken: true, 
//           };
//         }
//       }
//     })
//     .catch((error) => {
//       console.error(chalk.red(`Error al validar enlace: ${link.href}`), error);
//       return {
//         ...link,
//         isValid: false,
//         isBroken: true,
//         error: error.message,
//       };
//     });
// }
function isLinkValid(link) {
  console.log(chalk.cyan(`Validando enlace: ${link.href}`));

  if (!link.href) {
    return {
      ...link,
      isValid: false,
      isBroken: true,
      status: 'No URL',
    };
  }

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
        console.error(chalk.red(`Error ${response.status} - ${response.statusText}: ${link.href}`));
        return {
          ...link,
          status: response.status,
          statusText: response.statusText,
          isValid: false,
          isBroken: true,
        };
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