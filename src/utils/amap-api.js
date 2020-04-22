import axios from 'axios'

/**
 * AMap基础配置
 */
const AMapConfig = {
  baseUrl: 'https://restapi.amap.com/v3',
  key: '75aa8dbb1c8754889515b823b9eb92ab',
  sign: 'ee2b3834bf86de9f4f9867f72efac86d'
}

/**
 * AMap Url
 */
const AMapUrl = {
  // 驾车路径规划
  driving: AMapConfig.baseUrl + '/direction/driving'
}

/**
 * 高德Get请求统一调用方法
 * option: { url, params }
 */
const amapRequest = (option) => {
  const params = Object.assign({
    key: AMapConfig.key,
    sig: AMapConfig.sign,
    output: 'JSON'
  }, option.params)
  return new Promise((resolve) => {
    const requestParams = {
      url: option.url,
      method: 'GET',
      params: params
    }
    axios(requestParams).then(res => {
      if (res.status === 200) {
        if (res.data && res.data.infocode === '10000') {
          resolve({ code: 200, data: res.data, message: 'OK' })
        } else {
          resolve({ code: 999, data: null, message: res.data.info })
        }
      } else {
        resolve({ code: res.statusCode, data: null, message: res.errMsg })
      }
    }).catch(err => {
      resolve({ code: 999, data: null, message: err.message })
    })
  })
}

/**
 * 获取驾车路径规划（最快）
 * option: { startPoint, endPoint }
 */
const getFastDrivingPath = async (option) => {
  const params = {
    origin: option.startPoint.longitude + ',' + option.startPoint.latitude,
    destination: option.endPoint.longitude + ',' + option.endPoint.latitude
  }
  const { code, data, message } = await amapRequest({ url: AMapUrl.driving, params: params })
  return new Promise((resolve) => {
    if (code === 200) {
      if (data.route && data.route.paths.length) {
        const steps = data.route.paths[0].steps
        const pathPoints = []
        steps.forEach(stepEl => {
          if (stepEl.polyline) {
            const points = stepEl.polyline.split(';')
            points.forEach(pointsEl => {
              pathPoints.push({
                longitude: pointsEl.split(',')[0],
                latitude: pointsEl.split(',')[1]
              })
            })
          }
        })
        resolve({ code: code, data: pathPoints, message: message })
      } else {
        resolve({ code: 999, data: null, message: 'error' })
      }
    } else {
      resolve({ code: code, data: null, message: message })
    }
  })
}

export default {
  getFastDrivingPath
}
