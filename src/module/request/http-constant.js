// import { Toast } from 'vant'
import native from '@/module/native/native'

// http状态吗
const HttpStatus = {
  SUCCESS: 200,
  CLIENTERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  SERVERERROR: 500,
  BADGATEWAY: 502,
  SERVICEUNAVAILABLE: 503,
  GATEWAYTIMEOUT: 504
}

// 后台返回状态码
const HttpResponseCode = {
  SUCCESS: '00000000',
  TOKENERROR: '10001701',
  TOKENERROR2: '00000401',
  SERVERERROR: '00000500'
}

// 请求返回log
const HttpRequestLog = (url, data, res) => {
  console.log('request', url, JSON.stringify(data))
  console.log('response:', JSON.stringify(res))
}

// 错误提示弹窗
const ShowErrorMessage = (message) => {
  if (!message) { return }
  setTimeout(() => {
    // Toast(message)
    // uni.showToast({
    // 	title: message,
    // 	icon: 'none',
    // 	duration: 1500
    // })
    native.toast(message)
  })
}

export {
  HttpStatus,
  HttpResponseCode,
  HttpRequestLog,
  ShowErrorMessage
}
