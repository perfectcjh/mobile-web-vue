import httpRequest from '@/module/request/http-request.js'

const ipConfig = require('../config/ip.config.js')
const api = {
  ocrBusinessLicense: ipConfig.api_common + '/api/ocr/ocrBusinessLicense',
  ocrDriverLicense: ipConfig.api_common + '/api/ocr/ocrDriverLicense',
  ocrIdCard: ipConfig.api_common + '/api/ocr/ocrIdCard',
  ocrVehicleLicense: ipConfig.api_common + '/api/ocr/ocrVehicleLicense'
}

// 营业执照识别接口 params { imgUrl }
export const ocrBusinessLicense = (params) => {
  return httpRequest.get({
    url: api.ocrBusinessLicense,
    data: params
  })
}

// 驾驶证识别接口 params { imgUrl }
export const ocrDriverLicense = (params) => {
  return httpRequest.get({
    url: api.ocrDriverLicense,
    data: params
  })
}

// 身份证识别接口 params { idCardReverseUrl  idCardPositiveUrl }
export const ocrIdCard = (params) => {
  return httpRequest.get({
    url: api.ocrIdCard,
    data: params
  })
}

// 行驶证识别接口 params { imgUrl }
export const ocrVehicleLicense = (params) => {
  return httpRequest.get({
    url: api.ocrVehicleLicense,
    data: params
  })
}
