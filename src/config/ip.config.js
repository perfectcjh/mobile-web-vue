const globalConfig = require('./global.config.js')

const ipConfig = {
  development: {
    api_common: 'http://10.2.11.183/api-common',
    api_puds: 'http://10.2.11.183/api-puds',
    api_mars: 'http://10.2.11.183/api-mars',
    api_upload: 'http://10.2.11.183/api-common-oss'
  },
  production: {
    api_common: 'https://api.echem56.com/api-common',
    api_puds: 'https://api.echem56.com/api-puds',
    api_mars: 'https://api.echem56.com/api-mars',
    api_upload: 'https://api.echem56.com/api-common-oss'
  }
}

module.exports = ipConfig[globalConfig.env]
