const tinify = require('tinify')
tinify.key = "Bud9VFPOS6lzlnpTfKbcfOVQtyOjjWnM"

const METHODS = {
  original: source.resize({
    method: "thumbnail",
    width: 140,
    height: 140
  }),
  retina: source.resize({
    method: "thumbnail",
    width: 280,
    height: 280
  }),
};

function tinify(sourceURL, destURL, method) {
  const source = tinify.fromFile(sourceURL)
  const resized = source.resize(method)
  return resized.toFile(destURL).then((...data) => {
    console.log(data)
    return data
  })
}

module.exports = {
  default: tinify
}