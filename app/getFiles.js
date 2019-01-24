const path = require("path");
const sourceFolder = './sources/';
const fs = require('fs');

const getSourceFiles = () => {
  const pathUrl = path.resolve(__dirname, sourceFolder);
  return fs.readdirSync(pathUrl).map(fileName => {return pathUrl+'/'+fileName});
};

module.exports.getSourceFiles = getSourceFiles;
