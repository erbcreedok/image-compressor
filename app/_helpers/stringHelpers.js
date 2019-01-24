function latinize(str) {
  const convert = require('translitit-cyrillic-russian-to-latin')
  return convert(str)
}
function capitalize(c) {
  return c.toUpperCase()[0] + c.toLowerCase().substring(1)
}

module.exports = {
  latinize,
  capitalize
};