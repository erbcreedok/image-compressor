const path = require('path')
const distFolder = path.resolve(__dirname, './dest')
const {convert, resize, thumbnail} = require('easyimage');
const compress = require('compress-images');

const files = require('./getFiles').getSourceFiles()
const {stringHelpers, fileHelpers} = require('./_helpers')

files.forEach(async ({url, fileName}) => {
  const {name} = fileHelpers.getFileNameAndExpression(fileName)
  const newName = stringHelpers.latinize(name);
  const dist = `${distFolder}/${newName}.jpg`
  const distConvert  = `${distFolder}/convertToJPG/${newName}.jpg`
  const distThumbnailFolder = `${distFolder}/thumbnailJPG`
  const distThumbnail  = (suffix='') => `${distThumbnailFolder}/${newName}${suffix}.jpg`
  const distCompress = `${distFolder}/compressFromJPG/${newName}.jpg`
  const smartNamingMethos = ['tinify', 'jpegtran']
  const distCompressBy = (method) => (`${distFolder}/compressFrom/${stringHelpers.capitalize(method)}/${smartNamingMethos.indexOf(method) !== -1 ? '' : `${newName}.jpg`}`)
  const methods = {
    tinify: {name: 'tinify', configs: {engine: 'tinify', key: 'Bud9VFPOS6lzlnpTfKbcfOVQtyOjjWnM', command: false}},
    jpegoptim: {name: 'jpegoptim', configs: {engine: 'jpegoptim', command: ['--all-progressive', '-d']}},
    jpegtran: {name: 'jpegtran', configs: {engine: 'jpegtran', command: ['-trim', '-progressive', '-copy', 'none', '-optimize']}}
  }

  const generateConvert = async () => {
    const dist = distConvert;
    try {
      const d = await convert({
        src: url,
        dst: dist,
      });
      console.log('convert',{file: d})
      return dist
    } catch(err) {
      console.log('convert',err)
      return url
    }
  }

  const generateThumbnail = async (height, suffix='') => {
    const dist = distThumbnail(suffix)
    try {
      const d = await resize({
        src: distConvert,
        dst: dist,
        height,
        width: height
      });
      console.log('thumbnail', {type: suffix, file:d});
      return dist
    } catch(err) {
      console.log('thumbnail',err)
      return distConvert
    }
  }


  const converts = await generateConvert()

  const thumbs = await Promise.all([generateThumbnail(130,'-thumb'),generateThumbnail(260,'-thumb@2x'),generateThumbnail(400,'-view')])

});



