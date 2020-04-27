module.exports = ({ file }) => {
  let remUnit
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    remUnit = 37.5
  } else {
    remUnit = 75
  }
  return {
    'plugins': {
      // to edit target browsers: use "browserslist" field in package.json
      'postcss-import': {},
      'autoprefixer': {},
      'postcss-px2rem-exclude': {
        remUnit: remUnit,
        exclude: /node_modules|folder_name/i // 忽略node_modules目录下的文件
      }
    }
  }
}
