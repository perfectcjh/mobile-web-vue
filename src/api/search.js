import httpRequest from '@/module/request/http-request.js'

const ipConfig = require('../config/ip.config.js')
const api = {
  getSearchBankList: ipConfig.api_puds + '/api/bankCode/getList'
}

// 银行列表
export const getSearchBankList = (params) => {
  return httpRequest.get({
    url: api.getSearchBankList,
    data: params
  })
}
