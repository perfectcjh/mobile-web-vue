import httpRequest from '@/module/request/http-request.js'

const ipConfig = require('../config/ip.config.js')
const api = {
  login: ipConfig.api_common + '/biz/user/userLogin',
  smsLogin: ipConfig.api_common + '/biz/user/userMessageLogin',
  getSmsCaptcha: ipConfig.api_common + '/biz/usermessage/sendMessage',
  getLoginUserInfo: ipConfig.api_common + '/biz/user/getLoginUserInfo',
  logout: ipConfig.api_common + '/biz/user/Logout'
}

// 登录
export const login = (params) => {
  return httpRequest.post({
    url: api.login,
    data: params
  })
}

// 验证码登录
export const smsLogin = (params) => {
  return httpRequest.post({
    url: api.smsLogin,
    data: params
  })
}

// 获取手机验证码
export const getSmsCaptcha = (params) => {
  return httpRequest.post({
    url: api.getSmsCaptcha,
    data: params
  })
}

// 获取用户信息
export const getLoginUserInfo = (params) => {
  return httpRequest.post({
    url: api.getLoginUserInfo,
    data: params
  })
}
