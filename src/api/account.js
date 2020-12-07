import httpRequest from '@/module/request/http-request.js'

const ipConfig = require('../config/ip.config.js')
const api = {
  getDriverFeeList: ipConfig.api_outdoor + '/api-outdoor/v1/driverOperate/getDriverFeeDetailList',
  getDriverFeeDetail: ipConfig.api_outdoor + '/api-outdoor/v1/driverOperate/getDriverFeeDetail',
  getDriverFeeTotal: ipConfig.api_outdoor + '/api-outdoor/v1/driverOperate/getDriverStatisticsFee',
  getUserBankCardList: ipConfig.api_user + '/api-user/v1/IUserBankCardController/getBankCardList',
  addUserBankCard: ipConfig.api_user + '/api-user/v1/IUserBankCardController/saveBankCard',
  updateUserBankCard: ipConfig.api_user + '/api-user/v1/IUserBankCardController/updateUserBankCard',
  deleteUserBankCard: ipConfig.api_user + ''
}

// 获取账单列表
export const getDriverFeeList = (params) => {
  return httpRequest.post({
    url: api.getDriverFeeList,
    data: params
  })
}

// 获取账单详情
export const getDriverFeeDetail = (params) => {
  return httpRequest.post({
    url: api.getDriverFeeDetail,
    data: params
  })
}

// 获取账单汇总
export const getDriverFeeTotal = (params) => {
  return httpRequest.post({
    url: api.getDriverFeeTotal,
    data: params
  })
}

// 获取用户银行卡列表
export const getUserBankCardList = (params) => {
  return httpRequest.post({
    url: api.getUserBankCardList,
    data: params
  })
}

// 新增用户银行卡
export const addUserBankCard = (params) => {
  return httpRequest.post({
    url: api.addUserBankCard,
    data: params
  })
}

// 修改用户银行卡
export const updateUserBankCard = (params) => {
  return httpRequest.post({
    url: api.updateUserBankCard,
    data: params
  })
}

// 删除用户银行卡
export const deleteUserBankCard = (params) => {
  return httpRequest.post({
    url: api.deleteUserBankCard,
    data: params
  })
}
