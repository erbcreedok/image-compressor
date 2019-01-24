const tinify = require("tinify");
tinify.key = "Bud9VFPOS6lzlnpTfKbcfOVQtyOjjWnM";

const files = require('./getFiles').getSourceFiles();
const helpers = require('./_helpers')
console.log(files)
files.forEach(i => {
  console.log(helpers.latinizeString(i))
});



