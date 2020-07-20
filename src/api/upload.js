import HttpUpload from '@/module/request/http-upload.js'

const ipConfig = require('../config/ip.config.js')
const api = {
  uploadFile: ipConfig.api_upload + '/api/common/oss/upload'
}

// 上传图片
export const uploadFile = (params) => {
  return HttpUpload.uploadFile({
    url: api.uploadFile,
    file: params.file,
    bizCode: params.bizCode,
    bizExtraValue: params.bizExtraValue
  })
}

// 批量上传图片
export const uploadFiles = (params) => {
  return HttpUpload.uploadFiles({
    url: api.uploadFile,
    files: params.files,
    bizCode: params.bizCode,
    bizExtraValue: params.bizExtraValue
  })
}
