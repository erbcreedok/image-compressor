function changeExtensionName(filename, from, to) {
  const d = filename.split('.')
  if(d[d.length-1] === from) {
    d[d.length-1] = to
  } else {
    d.push(to)
  }
  return d.join('.')
}

function getFileNameAndExpression(filename) {
  const d = filename.split('.')
  const name = d.slice().splice(0, d.length-1).join('.')
  const expression = d.slice(d.length - 1).join('')
  return {name, expression}
}

module.exports = {
  changeExtensionName,
  getFileNameAndExpression
}