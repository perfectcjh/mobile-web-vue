import httpRequest from '@/module/request/http-request.js'

const ipConfig = require('../config/ip.config.js')
const api = {
  addDriver: ipConfig.api_puds + '/api-puds/v1/IAppDriverController/add',
  updateDriver: ipConfig.api_puds + '/api-puds/v1/IAppDriverController/update',
  getDriverDetail: ipConfig.api_puds + '/api-puds/v1/IAppDriverController/selectByUserId',
  addCar: ipConfig.api_puds + '/api-puds/v1/IAppVehicleController/add',
  updateCar: ipConfig.api_puds + '/api-puds/v1/IAppVehicleController/update',
  getCarDetail: ipConfig.api_puds + '/api-puds/v1/IAppVehicleController/queryByUserId'
}

// 添加司机（司机认证）
export const addDriver = (params) => {
  return httpRequest.post({
    url: api.addDriver,
    data: params
  })
}

// 更新司机（司机重新认证）
export const updateDriver = (params) => {
  return httpRequest.post({
    url: api.updateDriver,
    data: params
  })
}

// 获取自己司机信息
export const getDriverDetail = (params) => {
  return httpRequest.post({
    url: api.getDriverDetail,
    data: params
  })
}

// 添加车辆（车辆认证）
export const addCar = (params) => {
  return httpRequest.post({
    url: api.addCar,
    data: params
  })
}

// 更新车辆（车辆重新认证）
export const updateCar = (params) => {
  return httpRequest.post({
    url: api.updateCar,
    data: params
  })
}

// 获取自己车辆信息
export const getCarDetail = (params) => {
  return httpRequest.post({
    url: api.getCarDetail,
    data: params
  })
}
