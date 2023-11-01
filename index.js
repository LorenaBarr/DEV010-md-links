const mdLinks = require('./lib/mdLinks.js');
const isLinkValid = require('./lib/validateLinks.js');
// eslint-disable-next-line
const colors = require('colors');
// eslint-disable-next-line
const { Table } = require('console-table-printer');


mdLinks('examples/ejemplo1.md')
  .then((links) => {
    const linkPromises = links.map((link) => isLinkValid(link));
    return Promise.all(linkPromises);
  })
  .then((linksWithStatus) => {
    const table = new Table(); // Crea una nueva tabla

    // Configura el formato de las columnas
    table.addColumn({ name: 'Index', alignment: 'left', color: 'white', format: colors.white });
    table.addColumn({ name: 'Texto', alignment: 'left', color: 'cyan', format: colors.cyan });
    table.addColumn({ name: 'URL', alignment: 'left', color: 'magenta', format: colors.magenta });
    table.addColumn({ name: 'Válido', alignment: 'left', color: 'green', format: colors.green });
    table.addColumn({ name: 'Estado', alignment: 'left', color: 'yellow', format: colors.yellow });
    

    linksWithStatus.forEach((link, index) => {
      const rowData = {
        Index: index + 1,
        Texto: link.text,
        URL: link.href,
        Válido: link.isValid ? 'True' : 'False',
        Estado: link.status ? `${link.status} ${link.statusText}` : 'N/A',
      };

      table.addRow(rowData); // Agrega una fila a la tabla
    });

    table.printTable(); // Imprime la tabla


  // .then((linksWithStatus) => {
  //   console.table(linksWithStatus);
  //   linksWithStatus.forEach((link, index) => {
  //     console.log(`Enlace ${index + 1}:`);
  //     console.log(`- Texto: ${link.text}`.bgBrightGreen); 
  //     console.log(`- URL: ${link.href}` .bgBrightWhite);
  //     console.log(`- Válido: ${link.isValid}`.bgBrightCyan); 
  //     if (!link.isValid) {
  //       console.log(`- Estado: ${link.status} ${link.statusText}`.bgBrightMagenta); // Aplicar color
  //     }
  //     console.log('');
  //   });
  // })
    // linksWithStatus.forEach((link, index) => {
    //   console.log(`Enlace ${index + 1}:`);
    //   console.log(`- Texto: ${link.text}`);
    //   console.log(`- URL: ${link.href}`);
    //   console.log(`- Válido: ${link.isValid}`);  
    //   if (!link.isValid) {
    //     console.log(`- Estado: ${link.status} ${link.statusText}`);
    //   }
    //   console.log('');
    // });
  })
  .catch((error) => {
    console.error(error);
  });