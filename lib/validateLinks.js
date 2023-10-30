const fetch = require('node-fetch');

function isLinkValid(link) {
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
      return {
        ...link,
        isValid: false,
        error: error.message,
      };
    });
}

module.exports = { isLinkValid };