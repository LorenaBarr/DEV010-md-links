const { mdLinks } = require('./lib/mdLinks.js');

const isLinkValid = require('./lib/validateLinks.js');
// eslint-disable-next-line
const colors = require('colors');
// eslint-disable-next-line
const { Table } = require('console-table-printer');


mdLinks('examples/ejemplo1.md')
  .then((links) => {
    console.log(links);
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
        Estado: link.status !== undefined ? `${link.status} ${link.statusText}` : '404 Not Found',
      };

      if (!link.href) {
        rowData.Estado = 'N/A';
      }

      // if (link.status === 404) {
      //   rowData.Estado = '404 Not Found';
      // } else if (!link.href) {
      //   rowData.Estado = 'N/A';
      // } else {
      //   rowData.Estado = link.status !== undefined ? `${link.status} ${link.statusText}` : 'N/A';
      // }
      table.addRow(rowData); // Agrega una fila a la tabla
    });

    table.printTable(); // Imprime la tabla
  })
  .catch((error) => {
    console.error(error);
  });