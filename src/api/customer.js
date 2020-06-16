import httpRequest from '@/module/request/http-request.js'

const ipConfig = require('../config/ip.config.js')
const api = {
  getCustomerList: ipConfig.api_puds + '/api-puds/v1/IAppDriverController/queryBindCompany',
  confirmCustomerInvite: ipConfig.api_puds + '/api-puds/v1/IAppDriverController/driverBindCompany'
}

// 获取客户列表
export const getCustomerList = (params) => {
  return httpRequest.post({
    url: api.getCustomerList,
    data: params
  })
}

// 客户邀请操作  { companyId, driverId,  userId }
export const confirmCustomerInvite = (params) => {
  return httpRequest.post({
    url: api.confirmCustomerInvite,
    data: params
  })
}
