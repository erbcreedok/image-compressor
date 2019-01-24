const fs = require('fs')
const path = require("path")
const distFolder = path.resolve(__dirname, './dest')
const {convert} = require('easyimage');
const compress = require('compress-images');

(async function a() {
  try {

  } catch (e) {
    console.log("Error: ", e);
  }
})()

const files = require('./getFiles').getSourceFiles()
const {stringHelpers, fileHelpers} = require('./_helpers')

files.forEach(async ({url, fileName}) => {
  const {name} = fileHelpers.getFileNameAndExpression(fileName)
  const newName = stringHelpers.latinize(name);
  const dist = `${distFolder}/${newName}.jpg`
  const distConvert  = `${distFolder}/covertToJPG/${newName}.jpg`
  const distCompress = `${distFolder}/compressFromJPG/${newName}.jpg`
  const distCompressBy = (method) => (`${distFolder}/compressFrom${method === 'tinify' ? '' : `${stringHelpers.capitalize(method)}/${newName}.jpg`}`)
  const methods = {
    tinify: {name: 'tinify', configs: {engine: 'tinify', key: 'Bud9VFPOS6lzlnpTfKbcfOVQtyOjjWnM', command: false}},
    jpegoptim: {name: 'jpegoptim', configs: {engine: 'jpegoptim', command: ['--all-progressive', '-d']}},
    jpegtran: {name: 'jpegtran', configs: {engine: 'jpegtran', command: ['-trim', '-progressive', '-copy', 'none', '-optimize']}}
  }

  try {
    const d = await convert({
      src: url,
      dst: distConvert,
    })
    console.log({d})
  } catch(err) {
    console.log({err})
  }

  [methods.jpegoptim, methods.jpegtran].forEach(m => {
    compress(distConvert,
      distCompressBy(m.name),
      {compress_force: false, statistic: true, autoupdate: m.name!=='jpegtran'},
      false,
      {jpg: m.configs},
      {png: {engine: false, command: false}},
      {svg: {engine: false, command: false}},
      {gif: {engine: false, command: false}},
      function (...data) {
        console.log(data);
      });
  });
});



