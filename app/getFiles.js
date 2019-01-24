const path = require("path")
const sourceFolder = './sources/'
const fs = require('fs')

const getSourceFiles = () => {
  const pathUrl = path.resolve(__dirname, sourceFolder)
  try {
    return fs.readdirSync(pathUrl, {withFileTypes: true}).map(fileName => {
      return ({
        url: pathUrl+'/'+fileName,
        fileName
      })
    })
  } catch (e) {
    console.log(e, 'at ./app/getFiles.js')
    return []
  }
}

module.exports.getSourceFiles = getSourceFiles
