/**
 * AMap配置
 */
const AMapConfig = {
  key: '0d6f61194edf418d0f772089bd1e4b4e',
  version: '2.0'
}

/**
 * AMapWeb服务配置
 */
const AMapWebConfig = {
  baseUrl: 'https://restapi.amap.com/v3',
  key: 'e3e5f0454428d0c46e12a9d6f365c9d6'
  // sign: 'ee2b3834bf86de9f4f9867f72efac86d'
}

/**
 * AMap Url
 */
const AMapUrl = {
  driving: AMapConfig.baseUrl + '/direction/driving', // 驾车路径规划
  geocoder: AMapConfig.baseUrl + '/geocoder/geo', // 正地理编码
  regeocoder: AMapConfig.baseUrl + '/geocoder/regeo' // 反地理编码
}

export {
  AMapConfig,
  AMapWebConfig,
  AMapUrl
}
