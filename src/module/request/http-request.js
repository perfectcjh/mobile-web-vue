// import Vue from 'vue'
import HttpClient from './http-client.js'
// import store from '@/store'
// import notification from 'ant-design-vue/es/notification'
// import message from 'ant-design-vue/es/message'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
import { HttpStatus, HttpResponseCode, HttpRequestLog, ShowErrorMessage } from './http-constant.js'

const httpClient = new HttpClient()

// 请求头处理
const httpRequestHeader = (option) => {
  const headers = {
    appCode: 'PUDS'
  }
  // if (UserModel.isLogin()) {
  // 	const token = UserModel.getToken()
  // 	header.token = token
  // }
  return Object.assign({}, headers, option.headers)
}

// 请求参数处理
const httpRequestData = (option) => {
  const commonData = {
    appCode: 'PUDS'
  }
  return Object.assign({}, commonData, option.data)
}

// 业务请求类：httpRequest
const httpRequest = (option) => {
  const headers = httpRequestHeader(option)
  const data = httpRequestData(option)
  headers.token = '28b4b38fadc62ee8e4e163e26fde74a2'
  if (data.token) {
    headers.token = data.token
  }
  console.log('headers', JSON.stringify(headers))
  return new Promise((resolve) => {
    httpClient.request({
      url: option.url,
      method: option.method,
      headers: headers,
      data: data,
      params: data
    }).then(res => {
      HttpRequestLog(option.url, data, res.data)
      handleResponse(res, resolve)
    }).catch(err => {
      HttpRequestLog(option.url, data, err)
      handleError(err, resolve)
    })
  })
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

// get请求方法
const get = (option) => {
  option.method = 'GET'
  return httpRequest(option)
}

// post请求方法
const post = (option) => {
  option.method = 'POST'
  return httpRequest(option)
}

// 取消请求
const cancel = (name) => {
  httpClient.cancelRequest(name)
}

export default {
  get,
  post,
  cancel
}
