import HttpClient from './http-client.js'
import { HttpStatus, HttpResponseCode, HttpRequestLog, ShowErrorMessage } from './http-constant.js'
import UserModel from '@/model/user-model.js'
// import { Toast } from 'vant'

const httpClient = new HttpClient()

// 请求头处理
const httpUploadHeader = (option) => {
  const headers = {
    appCode: 'PUDS',
    'Content-Type': 'multipart/form-data'
  }
  if (UserModel.isLogin()) {
    headers.token = UserModel.getToken()
  }
  return Object.assign({}, headers, option.headers)
}

// 请求参数处理
const httpUploadData = (option) => {
  const file = option.file
  const formData = new FormData()
  formData.append('file', file)
  return formData
}

// 上传文件
const uploadFile = (option) => {
  const headers = httpUploadHeader(option)
  const data = httpUploadData(option)
  return new Promise((resolve) => {
    httpClient.request({
      url: `${option.url}?appCode=110&bizCode=${option.bizCode || ''}&bizExtraValue=${option.bizExtraValue || ''}`,
      method: option.method || 'POST',
      headers: headers,
      data: data
    }).then(res => {
      HttpRequestLog(option.url, data, res.data)
      handleResponse(res, resolve)
    }).catch(err => {
      HttpRequestLog(option.url, data, err)
      handleError(err, resolve)
    })
  })
}

// 批量上传文件，同一个bizCode
const uploadFiles = (option) => {
  const queue = async (files) => {
    const res = []
    let bizCode = option.bizCode || ''
    for (const file of files) {
      const params = {
        url: option.url,
        file: file,
        bizCode: bizCode
      }
      const { code, data } = await uploadFile(params)
      if (code === 200) {
        res.push(data)
        if (!bizCode) {
          bizCode = data.bizCode
        }
      } else {
        return Promise.resolve({ code: 999 })
      }
    }
    const callbackData = {
      files: res,
      filePaths: res.map(el => el.filePath),
      bizCode: bizCode
    }
    return Promise.resolve({ code: 200, data: callbackData })
  }
  return queue(option.files)
}

const handleResponse = (response, resolve) => {
  if (response.status === HttpStatus.SUCCESS) {
    const responseData = response.data
    if (responseData.code === HttpResponseCode.SUCCESS) {
      resolve({ code: 200, data: responseData.data, totalData: responseData, message: '' })
    } else {
      resolve({ code: 999, data: null, message: responseData.message || '' })
      if (responseData.message) {
        ShowErrorMessage(responseData.message)
      }
      if (responseData.code === HttpResponseCode.TOKENERROR || responseData.code === HttpResponseCode.TOKENERROR2) {
        // UserModel.logout()
        // uni.reLaunch({
        // 	url: '/pages/common/login/Login.vue'
        // })
      }
    }
  } else {
    resolve({ code: response.code, data: null, message: response.errMsg })
    ShowErrorMessage(response.errMsg)
  }
}

const handleError = (error, resolve) => {
  resolve({ code: 999, data: null, message: error.message })
  ShowErrorMessage(error.message)
}

export default {
  uploadFile,
  uploadFiles
}
