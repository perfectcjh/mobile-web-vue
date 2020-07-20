import httpRequest from '@/module/request/http-request.js'

const ipConfig = require('../config/ip.config.js')
const api = {
  login: ipConfig.api_user + '/api-user/v1/IBizUserController/userLogin',
  smsLogin: ipConfig.api_user + '/api-user/v1/IBizUserController/userMessageLogin',
  getSmsCaptcha: ipConfig.api_user + '/api-user/v1/IBizUserMessageController/sendMessage',
  getLoginUserInfo: ipConfig.api_puds + '/api-puds/v1/IBizUserController/getLoginUserInfo',
  logout: ipConfig.api_user + '/api-user/v1/IBizUserController/Logout',
  updateUserInfo: ipConfig.api_user + '/api-user/v1/IBizUserController/updateUser'
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

// 退出登录
export const logout = (params) => {
  return httpRequest.post({
    url: api.logout,
    data: params
  })
}
