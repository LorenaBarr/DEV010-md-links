const fetch = require('node-fetch');
const isLinkValid = require('../lib/validateLinks');

// jest.mock('node-fetch');

// describe('isLinkValid', () => {
//   it('should return invalid link information when fetch fails', () => {
//     const link = {
//       href: 'https://example.com',
//       text: 'Example',
//     };

//     const mockErrorResponse = {
//       ok: false,
//       status: 404,
//       statusText: 'Not Found',
//     };

//     fetch.mockResolvedValue(mockErrorResponse);

//     return isLinkValid(link).then((result) => {
//       expect(result).toEqual({
//         href: 'https://example.com',
//         text: 'Example',
//         isValid: false,
//         isBroken: true,
//         status: 404,
//         statusText: 'Not Found',
//       });
//     });
//   });

// });

// Mock de 'node-fetch' para simular su comportamiento
jest.mock('node-fetch');

// Descripción de las pruebas para la función isLinkValid
describe('isLinkValid', () => {
  // Prueba para verificar si la función maneja adecuadamente el caso en que falta la URL
  it('should return invalid link information when URL is missing', () => {
    const link = {
      // Enlace sin URL
      text: 'Example',
    };

    // Llamada a la función isLinkValid con el enlace sin URL
    const result = isLinkValid(link);

    // Verificación de que el resultado coincide con lo esperado
    expect(result).toEqual({
      text: 'Example',
      isValid: false,
      isBroken: true,
      status: 'No URL',
    });
  });

  // Prueba para verificar si la función devuelve información de enlace válida cuando la solicitud fetch tiene éxito
  it('should return valid link information when fetch is successful', () => {
    const link = {
      href: 'https://example.com',
      text: 'Example',
    };

    // Respuesta simulada exitosa de la solicitud fetch
    const mockSuccessfulResponse = {
      ok: true,
      status: 200,
      statusText: 'OK',
    };

    // Configuración del mock de fetch para devolver la respuesta simulada
    fetch.mockResolvedValue(mockSuccessfulResponse);

    // Llamada a la función isLinkValid con el enlace y el mock de fetch configurado
    return isLinkValid(link).then((result) => {
      // Verificación de que el resultado coincide con lo esperado
      expect(result).toEqual({
        href: 'https://example.com',
        text: 'Example',
        isValid: true,
        status: 200,
        statusText: 'OK',
      });
    });
  });

  // Prueba para verificar si la función devuelve información de enlace no válida cuando la solicitud fetch falla
  it('should return invalid link information when fetch fails', () => {
    const link = {
      href: 'https://example.com',
      text: 'Example',
    };

    // Respuesta simulada de error de la solicitud fetch
    const mockErrorResponse = {
      ok: false,
      status: 404,
      statusText: 'Not Found',
    };

    // Configuración del mock de fetch para devolver la respuesta simulada de error
    fetch.mockResolvedValue(mockErrorResponse);

    // Llamada a la función isLinkValid con el enlace y el mock de fetch configurado
    return isLinkValid(link).then((result) => {
      // Verificación de que el resultado coincide con lo esperado
      expect(result).toEqual({
        href: 'https://example.com',
        text: 'Example',
        isValid: false,
        isBroken: true,
        status: 404,
        statusText: 'Not Found',
      });
    });
  });

  // Prueba para verificar si la función devuelve información de enlace no válida con detalles de error cuando la solicitud fetch arroja un error
  it('should return invalid link information with error details when fetch throws an error', () => {
    const link = {
      href: 'https://example.com',
      text: 'Example',
    };

    // Error simulado lanzado por la solicitud fetch
    const mockError = new Error('Fetch error');

    // Configuración del mock de fetch para lanzar el error simulado
    fetch.mockRejectedValue(mockError);

    // Llamada a la función isLinkValid con el enlace y el mock de fetch configurado
    return isLinkValid(link).then((result) => {
      // Verificación de que el resultado coincide con lo esperado
      expect(result).toEqual({
        href: 'https://example.com',
        text: 'Example',
        isValid: false,
        isBroken: true,
        error: 'Fetch error',
      });
    });
  });

  // si quiero cubrir otra linea, en este espacio
});