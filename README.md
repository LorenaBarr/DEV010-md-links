# MD-Links

 ## Índice
1. [Preámbulo](#preámbulo)
2. [Resumen del Proyecto](#resumen-del-proyecto)
3. [Desarrollo del Proyecto](#desarrollo-del-proyecto)
   1. [Hito 1: Javascript API](#hito-1-javascript-api)
   2. [Hito 2: Javascript API con segundo parámetro opcional "validate"](#hito-2-javascript-api-con-segundo-parámetro-opcional-validate)
   3. [Hito 3: Buscando dentro de un directorio](#hito-3-buscando-dentro-de-un-directorio)
4. [Código](#código)
   1. [mdLinks.js](#mdlinksjs)
   2. [readFile.js](#readfilejs)
   3. [utils.js](#utilsjs)
   4. [index.js](#indexjs)
5. [Pruebas Unitarias](#pruebas-unitarias)
6. [Tecnologías Aplicadas](#tecnologías-aplicadas)
7. [Enlaces Útiles](#enlaces-útiles)


## 1. Preámbulo
Markdown es un lenguaje de marcado ligero ampliamente utilizado entre los desarrolladores. Se emplea en numerosas plataformas que manejan texto plano (GitHub, foros, blogs, etc.), y los archivos Markdown son comunes en varios repositorios.

Estos archivos Markdown a menudo contienen enlaces que a veces están rotos o ya no son válidos, afectando negativamente el valor de la información compartida.

## 2. Resumen del Proyecto
MD-Links es un proyecto creado en Node.js. Involucra el desarrollo de una biblioteca dentro de este entorno de ejecución que lee y analiza archivos en formato Markdown. El objetivo es verificar los enlaces contenidos en estos archivos y generar un informe con algunas estadísticas.

## 3. Desarrollo del Proyecto
### 3.1 Hito 1: Javascript API
En este hito, se creó la versión más sencilla de mdlinks. Se desarrolló una función que retorna una promesa con los links encontrados dentro de un archivo Markdown específico. La función es un módulo que puede importarse en otros scripts de Node.js y ofrece la interfaz mdLinks(path).

#### Tareas Realizadas:

Creación de una Promesa.
Transformación de la ruta ingresada a absoluta.
Comprobación de la existencia de la ruta en el sistema.
Aseguramiento de que el archivo sea de tipo Markdown.
Lectura del contenido del archivo.
Extracción de los enlaces dentro del documento.
3.2 Hito 2: Javascript API con segundo parámetro opcional "validate"
En este hito, se agregó un parámetro adicional a la función mdLinks llamado validate, que recibe un valor booleano. validate es un argumento opcional y afecta la salida de la función.

#### Interfaz Actualizada:

mdLinks(path, validate)
Valor que resuelve la promesa con validate = false o undefined:

Un arreglo con objetos que representan links, con las propiedades href, text, y file.
Valor que resuelve la promesa con validate = true:

Un arreglo con objetos que representan links, con las propiedades href, text, file, status, y ok.

### 3.3 Hito 3: Buscando dentro de un directorio
En este hito, se mejoró la función mdLinks para que pueda recibir un directorio como ruta. La función ahora recorre todos los archivos existentes en el directorio y, por cada archivo .md, extrae los links para mostrarlos en pantalla.

#### Tareas Realizadas:

Obtención del contenido de un directorio.
Unión de dos rutas para acceder a directorios y archivos.
## 4. Código
El código del proyecto se basa en la modularización (CommonJS) de funciones, ayudando a organizar y estructurar el código en archivos JS separados. Hay cuatro secciones principales que definen la funcionalidad de nuestra biblioteca.
Bibliotecas y Módulos Utilizados
chalk: Librería para dar formato a la salida en la consola mediante colores.

Métodos utilizados: chalk.cyan, chalk.white.
fs (File System): Módulo de Node.js para trabajar con el sistema de archivos.

Métodos utilizados: fs.promises.readFile, fs.promises.access, fs.readdir.
path: Módulo de Node.js para manipulación de rutas de archivos y directorios.

Métodos utilizados: path.join, path.extname, path.resolve, path.isAbsolute.
Tecnologías y Conceptos Destacados
Promesas (Promise): Se emplean para gestionar operaciones asíncronas y realizar tareas concurrentes.

Expresiones Regulares (Regex): Utilizadas para analizar y extraer información de cadenas de texto, especialmente para identificar enlaces en archivos Markdown.

Fetch API: Utilizada para realizar solicitudes HTTP y validar la existencia y estado de los enlaces.

ES6 (ECMAScript 2015): Se han aplicado características de ECMAScript 2015, como destructuración de objetos, funciones de flecha y operadores de expansión/rest.

Node.js: El proyecto está diseñado para ejecutarse en el entorno de Node.js.

#### Estructura del Proyecto
Módulos: El código se organiza en módulos para mejorar la legibilidad y mantenibilidad.

Exportación e Importación de Módulos: Se utiliza module.exports para exportar funciones y objetos de un módulo, y require para importarlos en otros módulos.

#### Funciones Principales
isLinkValid: Valida la existencia y estado de un enlace mediante solicitudes HTTP.

doesFileExist: Verifica la existencia de un archivo en una ruta dada.

getMdFilesInDirectory: Obtiene una lista de archivos Markdown en un directorio.

analyzeLinks: Analiza un archivo Markdown para extraer información sobre los enlaces.

mdLinks: Coordina la verificación de enlaces en archivos Markdown, ya sea en un archivo específico o en un directorio.

convertToAbsolutePath y isAbsolutePath: Funciones utilitarias para trabajar con rutas.


## 5. Pruebas Unitarias
El proyecto incluye un conjunto de pruebas para las funciones mdLinks, isLinkValid, doesFileExist, getMdFilesInDirectory, y analyzeLinks. Las pruebas también contribuyeron a alcanzar una cobertura cercana al 100%.
[Resultado de Pruebas Unitarias](https://drive.google.com/file/d/1peQu3xvrdo3GosrErhV9OsGtbeMFDrcm/view?usp=sharing)
## 6. Tecnologías Aplicadas
JavaScript: Implementa funcionalidad para analizar el texto ingresado y mostrar resultados.
Node.js: Un entorno de ejecución de JavaScript en el lado del servidor.
CommonJS: Se utilizan módulos para organizar y estructurar el código en archivos JS separados. module.exports se utiliza para exportar funciones y variables desde el módulo, y require('./module') se utiliza para importar el módulo en otro archivo.
Módulo fs: Interactúa con el sistema de archivos.
Módulo path: Funciona con rutas de archivos y directorios.
Fetch: Biblioteca para realizar solicitudes HTTP.
EsLint: Herramienta de linting para JavaScript.
Jest: Marco de pruebas para JavaScript.






## 7. Enlaces de aprendizaje

### JavaScript

- [ ] **Diferenciar entre tipos de datos primitivos y no primitivos**

- [ ] **Arrays (arreglos)**

  <details><summary>Links</summary><p>

  * [Arreglos](https://curriculum.laboratoria.la/es/topics/javascript/04-arrays)
  * [Array - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/)
  * [Array.prototype.sort() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
  * [Array.prototype.forEach() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
  * [Array.prototype.map() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
  * [Array.prototype.filter() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
  * [Array.prototype.reduce() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
</p></details>

- [ ] **Objetos (key, value)**

  <details><summary>Links</summary><p>

  * [Objetos en JavaScript](https://curriculum.laboratoria.la/es/topics/javascript/05-objects/01-objects)
</p></details>

- [ ] **Uso de condicionales (if-else, switch, operador ternario, lógica booleana)**

  <details><summary>Links</summary><p>

  * [Estructuras condicionales y repetitivas](https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops)
  * [Tomando decisiones en tu código — condicionales - MDN](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/conditionals)
</p></details>

- [ ] **Funciones (params, args, return)**

  <details><summary>Links</summary><p>

  * [Funciones (control de flujo)](https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/03-functions)
  * [Funciones clásicas](https://curriculum.laboratoria.la/es/topics/javascript/03-functions/01-classic)
  * [Arrow Functions](https://curriculum.laboratoria.la/es/topics/javascript/03-functions/02-arrow)
  * [Funciones — bloques de código reutilizables - MDN](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions)
</p></details>

- [ ] **Recursión o recursividad**

  <details><summary>Links</summary><p>

  * [Píldora recursión - YouTube Laboratoria Developers](https://www.youtube.com/watch?v=lPPgY3HLlhQ)
  * [Recursión o Recursividad - Laboratoria Developers en Medium](https://medium.com/laboratoria-developers/recursi%C3%B3n-o-recursividad-ec8f1a359727)
</p></details>

- [ ] **Módulos de CommonJS**

  <details><summary>Links</summary><p>

  * [Modules: CommonJS modules - Node.js Docs](https://nodejs.org/docs/latest/api/modules.html)
</p></details>

- [ ] **Diferenciar entre expresiones (expressions) y sentencias (statements)**

- [ ] **Callbacks**

  <details><summary>Links</summary><p>

  * [Función Callback - MDN](https://developer.mozilla.org/es/docs/Glossary/Callback_function)
</p></details>

- [ ] **Promesas**

  <details><summary>Links</summary><p>

  * [Promise - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise)
  * [How to Write a JavaScript Promise - freecodecamp (en inglés)](https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/)
</p></details>

- [ ] **Pruebas unitarias (unit tests)**

  <details><summary>Links</summary><p>

  * [Empezando con Jest - Documentación oficial](https://jestjs.io/docs/es-ES/getting-started)
</p></details>

- [ ] **Pruebas asíncronas**

  <details><summary>Links</summary><p>

  * [Tests de código asincrónico con Jest - Documentación oficial](https://jestjs.io/docs/es-ES/asynchronous)
</p></details>

- [ ] **Uso de mocks y espías**

  <details><summary>Links</summary><p>

  * [Manual Mocks con Jest - Documentación oficial](https://jestjs.io/docs/es-ES/manual-mocks)
</p></details>

- [ ] **Pruebas de compatibilidad en múltiples entornos de ejecución**

- [ ] **Uso de linter (ESLINT)**

- [ ] **Uso de identificadores descriptivos (Nomenclatura y Semántica)**

### Node.js

- [ ] **Instalar y usar módulos con npm**

  <details><summary>Links</summary><p>

  * [Sitio oficial de npm (en inglés)](https://www.npmjs.com/)
</p></details>

- [ ] **Configuración de package.json**

  <details><summary>Links</summary><p>

  * [package.json - Documentación oficial (en inglés)](https://docs.npmjs.com/files/package.json)
</p></details>

- [ ] **Configuración de npm-scripts**

  <details><summary>Links</summary><p>

  * [scripts - Documentación oficial (en inglés)](https://docs.npmjs.com/misc/scripts)
</p></details>

- [ ] **process (env, argv, stdin-stdout-stderr, exit-code)**

  <details><summary>Links</summary><p>

  * [Process - Documentación oficial (en inglés)](https://nodejs.org/api/process.html)
</p></details>

- [ ] **File system (fs, path)**

  <details><summary>Links</summary><p>

  * [File system - Documentación oficial (en inglés)](https://nodejs.org/api/fs.html)
  * [Path - Documentación oficial (en inglés)](https://nodejs.org/api/path.html)
</p></details>

### Control de Versiones (Git y GitHub)

- [ ] **Git: Instalación y configuración**

- [ ] **Git: Control de versiones con git (init, clone, add, commit, status, push, pull, remote)**

- [ ] **Git: Integración de cambios entre ramas (branch, checkout, fetch, merge, reset, rebase, tag)**

- [ ] **GitHub: Creación de cuenta y repos, configuración de llaves SSH**

- [ ] **GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)**

- [ ] **GitHub: Organización en Github (projects | issues | labels | milestones | releases)**

### HTTP

- [ ] **Consulta o petición (request) y respuesta (response).**

  <details><summary>Links</summary><p>

  * [Generalidades del protocolo HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Overview)
  * [Mensajes HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Messages)
</p></details>

- [ ] **Códigos de status de HTTP**

  <details><summary>Links</summary><p>

  * [Códigos de estado de respuesta HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
  * [The Complete Guide to Status Codes for Meaningful ReST APIs - dev.to](https://dev.to/khaosdoctor/the-complete-guide-to-status-codes-for-meaningful-rest-apis-1-5c5)
</p></details>

