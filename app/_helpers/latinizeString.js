function latinizeString(str) {
  const convert = require('translitit-cyrillic-russian-to-latin')
  return convert(str);
}

module.exports.latinizeString = latinizeString;