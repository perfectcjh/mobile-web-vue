// import AMapLoader from '@amap/amap-jsapi-loader'
// import { AMapConfig } from './amap-constant'

// const AMap = null

// const plugins = [
//   'AMap.ToolBar',
//   'AMap.Scale',
//   'AMap.Marker',
//   'AMap.PolylineEditor',
//   'AMap.Geolocation',
//   'AMap.Geocoder' // 地理编码
// ]

// const loadAMap = async (htmlId) => {
//   const params = {
//     key: AMapConfig.key,
//     version: AMapConfig.version,
//     plugins: plugins
//   }
//   const AMap = await AMapLoader.load(params)
//   return Promise
//   this.AMap = AMap
//   this.map = new AMap.Map(htmlId, {
//     center: [this.centerPoint.longitude, this.centerPoint.latitude],
//     resizeEnable: true,
//     zooms: [5, 18],
//     zoom: 5,
//     viewMode: '2D',
//     mapStyle: 'amap://styles/b89c88006c40bdb8d2d6e2ac37388443'
//   })
// }

const isResultOk = (status, result) => {
  return status === 'complete' && result.info === 'OK'
}

/**
 * 获取当前位置
 */
const getCurrentLocation = (AMap) => {
  const geolocation = new AMap.Geolocation({
    enableHighAccuracy: true, // 是否使用高精度定位
    timeout: 100 * 1000, // 设置定位超时时间
    // buttonOffset: new AMap.Pixel(10, 20), // 定位按钮的停靠位置的偏移量
    zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见
    buttonPosition: 'RB' // 定位按钮的排放位置 RB表示右下
  })
  return new Promise(resolve => {
    geolocation.getCurrentPosition((status, result) => {
      console.log('getCurrentLocation', status, result)
      if (result && result.position) {
        const positionObj = result.position
        const position = {
          longitude: positionObj.lng,
          latitude: positionObj.lat
        }
        resolve({ code: 200, data: position, message: '' })
      } else {
        resolve({ code: 999, data: null, message: 'error' })
      }
    })
  })
}

/**
 * 正地理编码
 * option: { city, address }
 */
const geocoderAddress = (option, AMap) => {
  const geocoder = new AMap.Geocoder({
    city: option.city || '全国'
  })
  return new Promise(resolve => {
    geocoder.getLocation(option.address, (status, result) => {
      console.log('geocoderAddress', status, result)
      if (isResultOk(status, result) && result.geocodes && result.geocodes.length) {
        const geocodeObj = result.geocodes[0]
        const position = {
          longitude: geocodeObj.location.lng,
          latitude: geocodeObj.location.lat
        }
        resolve({ code: 200, data: position, message: '' })
      } else {
        resolve({ code: 999, data: null, message: 'error' })
      }
    })
  })
}

/**
 * 反地理编码
 * option: { city, address }
 */
const regeocoderLocation = (option, AMap) => {
  const geocoder = new AMap.Geocoder({
    city: option.city || '全国'
  })

  const location = [option.longitude, option.latitude]

  return new Promise(resolve => {
    geocoder.getAddress(location, (status, result) => {
      console.log('regeocoderLocation', status, result)
      if (isResultOk(status, result) && result.regeocode) {
        const regeocodeObj = result.regeocode
        const position = {
          address: regeocodeObj.formattedAddress
        }
        resolve({ code: 200, data: position, message: '' })
      } else {
        resolve({ code: 999, data: null, message: 'error' })
      }
    })
  })
}

/**
 * 获取最快路径点
 * option: { startPoint, endPoint }
 */
const getFastPathPoint = (option, AMap) => {
  const driving = new AMap.Driving({
    policy: AMap.DrivingPolicy.LEAST_TIME // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
  })

  const startPoint = [option.startPoint.longitude, option.startPoint.latitude]
  const endPoint = [option.endPoint.longitude, option.endPoint.latitude]

  return new Promise(resolve => {
    driving.search(startPoint, endPoint, (status, result) => {
      console.log('getFastPathPoint', status, result)
      if (isResultOk(status, result) && result.routes && result.routes.length) {
        const pathPoints = []
        const steps = result.routes[0].steps
        if (steps && steps.length) {
          steps.forEach(stepEl => {
            const path = stepEl.path
            if (path && path.length) {
              path.forEach(pathEl => {
                pathPoints.push({
                  longitude: pathEl.lng,
                  latitude: pathEl.lat
                })
              })
            }
          })
        }
        resolve({ code: 200, data: pathPoints, message: '' })
      } else {
        resolve({ code: 999, data: null, message: 'error' })
      }
    })
  })
}

export default {
  // loadAmap,
  getCurrentLocation,
  geocoderAddress,
  regeocoderLocation,
  getFastPathPoint
}
