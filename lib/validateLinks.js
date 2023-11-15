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
  // Función para validar la validez de un enlace
  // Imprime un mensaje indicando que se está validando el enlace
  console.log(chalk.cyan(`Validando enlace: ${link.href}`));

  // Verifica si el enlace no tiene una URL
  if (!link.href) {
    // Si no tiene URL, devuelve un objeto indicando que el enlace no es válido y está roto
    return {
      ...link,
      isValid: false,
      isBroken: true,
      status: 'No URL',
    };
  }

  // Realiza una solicitud de red para verificar el estado del enlace
  return fetch(link.href)
    .then((response) => {
      // Si la respuesta es exitosa (código 2xx), devuelve un objeto con información del enlace válido
      if (response.ok) {
        return {
          ...link,
          status: response.status,
          statusText: response.statusText,
          isValid: true,
        };
      } else {
        // Si la respuesta no es exitosa, imprime un mensaje de error y devuelve un objeto indicando que el enlace no es válido y está roto
        console.error(chalk.white(`Error ${response.status} - ${response.statusText}: ${link.href}`));
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
      // Si hay un error en la solicitud, imprime un mensaje de error y devuelve un objeto indicando que el enlace no es válido y está roto
      console.error(chalk.white(`Error al validar enlace: ${link.href}`), error);
      return {
        ...link,
        isValid: false,
        isBroken: true,
        error: error.message,
      };
    });
}

// Exporta la función para que pueda ser utilizada en otros archivos
module.exports = isLinkValid;