import httpRequest from '@/module/request/http-request.js'

const ipConfig = require('../config/ip.config.js')
const api = {
  getOrderList: ipConfig.api_outdoor + '/api-outdoor/v1/waybillDepart/getPage',
  getOrderDetail: ipConfig.api_outdoor + '/api-outdoor/v1/waybillDepart/getDetail',
  taskOrder: ipConfig.api_outdoor + '/api-outdoor/v1/driverOperate/takingOrdersByDriver',
  orderPickupCompleted: ipConfig.api_outdoor + '/api-outdoor/v1/driverOperate/pickupCompleted',
  orderReceiptCompleted: ipConfig.api_outdoor + '/api-outdoor/v1/driverOperate/arriveDestination',
  orderSignCompleted: ipConfig.api_outdoor + '/api-outdoor/v1/driverOperate/signCompleted'
}

// 订单列表
export const getOrderList = (params) => {
  return httpRequest.post({
    url: api.getOrderList,
    data: params
  })
}

// 订单详情
export const getOrderDetail = (params) => {
  return httpRequest.post({
    url: api.getOrderDetail,
    data: params
  })
}

// 添加订单（接单）
export const taskOrder = (params) => {
  return httpRequest.post({
    url: api.taskOrder,
    data: params
  })
}

// 订单提货完成
export const orderPickupCompleted = (params) => {
  return httpRequest.post({
    url: api.orderPickupCompleted,
    data: params
  })
}

// 订单卸货完成
export const orderReceiptCompleted = (params) => {
  return httpRequest.post({
    url: api.orderReceiptCompleted,
    data: params
  })
}

// 订单签收完成
export const orderSignCompleted = (params) => {
  return httpRequest.post({
    url: api.orderSignCompleted,
    data: params
  })
}
