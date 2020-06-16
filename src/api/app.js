import httpRequest from '@/module/request/http-request.js'

const ipConfig = require('../config/ip.config.js')
const api = {
  checkUpdate: 'https://oss-svc.oss-cn-shanghai.aliyuncs.com/etiger56/app/delopConfig.json',
  uploadLocation: ipConfig.api_mars + '/api/tra/reportTra'
}

// 获取更新
export const checkUpdate = () => {
  return httpRequest.get({
    url: api.checkUpdate,
    data: {}
  })
}

// 定时上报位置
export const uploadLocation = (params) => {
  return httpRequest.post({
    url: api.uploadLocation,
    data: params
  })
}
