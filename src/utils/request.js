// import Vue from 'vue'
import axios from 'axios'
// import store from '@/store'
// import notification from 'ant-design-vue/es/notification'
// import message from 'ant-design-vue/es/message'
// import { ACCESS_TOKEN } from '@/store/mutation-types'

// const HttpStatus = {
//   SUCCESS: 200,
//   CLIENTERROR: 400,
//   AUTHENTICATE: 401,
//   FORBIDDEN: 403,
//   NOTFOUND: 404,
//   SERVERERROR: 500,
//   BADGATEWAY: 502,
//   SERVICEUNAVAILABLE: 503,
//   GATEWAYTIMEOUT: 504
// }

const HttpResponseCode = {
  SUCCESS: '00000000',
  TOKENERROR: '10001701',
  TOKENERROR2: '00000401',
  SERVERERROR: '00000500'
}

// 基础请求类：httpClient
const httpClient = axios.create({
  baseURL: '',
  timeout: 60000
})

httpClient.interceptors.request.use(config => {
  // config.headers.appCode = 'ECHAM56'
  // const token = Vue.ls.get(ACCESS_TOKEN)
  // if (token) {
  //   config.headers['token'] = token
  // }
  return config
}, err => {
  return Promise.reject(err)
})

httpClient.interceptors.response.use(response => {
  if (response.request.responseType === 'blob') {
    if (response.data.type === 'application/pdf' && response.request.responseURL.indexOf('previewpdf') !== -1) {
      return response.data
    }
    var contentDisposition = response.headers['content-disposition']
    var name = contentDisposition.substring(contentDisposition.indexOf('filename=') + 9, contentDisposition.length)
    const link = document.createElement('a')
    const blob = new Blob([response.data], { type: response.headers['content-type'] })
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', decodeURIComponent(name))
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return response.data
}, err => {
  return Promise.reject(err)
})

// 业务请求类：httpService
const httpService = (option) => {
  const commonParams = {
    appCode: 'ECHEM56',
    appName: 'ECHEM'
  }
  const params = Object.assign({}, commonParams, option.params)
  const data = Object.assign({}, commonParams, option.data)
  option.params = params
  option.data = data
  return new Promise((resolve, reject) => {
    const config = option
    httpClient(config)
      .then(res => {
        handleResponse(res, resolve, reject)
      })
      .catch(err => {
        handleError(err, reject)
      })
  })
}

const handleResponse = (response, resolve, reject) => {
  if (!response) {
    reject()
    return
  }
  if (response.code !== HttpResponseCode.SUCCESS && response.code !== '000' && response.code !== '10002000' && response.code !== '10301000') {
    if (response.message) {
      // setTimeout(() => {
      //   message.error(response.message)
      // })
    }
    if (response.code === HttpResponseCode.TOKENERROR || response.code === HttpResponseCode.TOKENERROR2) {
      // const token = Vue.ls.get(ACCESS_TOKEN)
      // if (token) {
      //   store.dispatch('Logout').then(() => {
      //     setTimeout(() => {
      //       window.location.reload()
      //     }, 1500)
      //   })
      // }
    }
    reject()
    return
  }
  resolve(response)
}

const handleError = (error, reject) => {
  reject()
  // notification.error({
  //   message: '错误',
  //   description: error.message
  // })
  console.log(error.message)
}

export {
  httpService
}
