import httpRequest from '@/module/request/http-request.js'

const ipConfig = require('../config/ip.config.js')
const api = {
  getDriverFeeList: ipConfig.api_puds + '/api/forward/driverOperate/getDriverFeeDetailList',
  getDriverFeeDetail: ipConfig.api_puds + '/api/forward/driverOperate/getDriverFeeDetail',
  getDriverFeeTotal: ipConfig.api_puds + '/api/forward/driverOperate/getDriverStatisticsFee'
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
