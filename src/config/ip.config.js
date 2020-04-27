const env = 'development'

const ipConfig = {
  development: {
    echem_user: 'http://10.2.11.183/api-common',
    echem_gateWay: 'http://10.2.11.183/api-puds',
    echem_upload: 'http://10.2.11.183/api-common-oss'
  },
  production: {
    echem_user: 'http://10.2.11.183/api-common',
    echem_gateWay: 'http://10.2.11.183/api-puds',
    echem_upload: 'http://10.2.11.183/api-common-oss'
  }
}

module.exports = ipConfig[env]
