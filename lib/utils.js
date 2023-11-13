const path = require('path');



function convertToAbsolutePath(filePath) {
  return path.resolve(filePath);
}
function isAbsolutePath(filePath) {
  return path.isAbsolute(filePath);
}



module.exports = { convertToAbsolutePath, isAbsolutePath };