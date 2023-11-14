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


jest.mock('node-fetch');

describe('isLinkValid', () => {
  it('should return invalid link information when URL is missing', () => {
    const link = {
      // Enlace sin URL
      text: 'Example',
    };

    const result = isLinkValid(link);

    expect(result).toEqual({
      text: 'Example',
      isValid: false,
      isBroken: true,
      status: 'No URL',
    });
  });

  it('should return valid link information when fetch is successful', () => {
    const link = {
      href: 'https://example.com',
      text: 'Example',
    };

    const mockSuccessfulResponse = {
      ok: true,
      status: 200,
      statusText: 'OK',
    };

    fetch.mockResolvedValue(mockSuccessfulResponse);

    return isLinkValid(link).then((result) => {
      expect(result).toEqual({
        href: 'https://example.com',
        text: 'Example',
        isValid: true,
        status: 200,
        statusText: 'OK',
      });
    });
  });

  it('should return invalid link information when fetch fails', () => {
    const link = {
      href: 'https://example.com',
      text: 'Example',
    };

    const mockErrorResponse = {
      ok: false,
      status: 404,
      statusText: 'Not Found',
    };

    fetch.mockResolvedValue(mockErrorResponse);

    return isLinkValid(link).then((result) => {
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

  it('should return invalid link information with error details when fetch throws an error', () => {
    const link = {
      href: 'https://example.com',
      text: 'Example',
    };

    const mockError = new Error('Fetch error');

    fetch.mockRejectedValue(mockError);

    return isLinkValid(link).then((result) => {
      expect(result).toEqual({
        href: 'https://example.com',
        text: 'Example',
        isValid: false,
        isBroken: true,
        error: 'Fetch error',
      });
    });
  });

 
});