const { convertToAbsolutePath, isAbsolutePath } = require('../lib/utils.js');
// const doesFileExist = require('../lib/utils.js');

describe('convertToAbsolutePath', () => {
  it('Debería retornar la ruta absoluta si es relativa', () => {
    // console.log('-------------------------------------', convertToAbsolutePath('test/pruebastest/testFile.md'));

    const relativePath = 'test/pruebastest/testFile.md';
    const absolutePath = 'C:\\Users\\LOREN\\DEV010-md-links\\test\\pruebastest\\testFile.md';
    const resultPath = convertToAbsolutePath(relativePath);
    expect(resultPath).toEqual(absolutePath);
  });
});

describe('isAbsolutePath', () => {
  it('debería retornar la misma ruta si es absoluta', () => {
    const absolutePath = 'C:\\Users\\LOREN\\DEV010-md-links\\test\\pruebastest\\testFile.md';
    expect(isAbsolutePath(absolutePath)).toBe(true);
  });
});

