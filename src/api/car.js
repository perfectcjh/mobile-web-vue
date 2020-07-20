import httpRequest from '@/module/request/http-request.js'

const ipConfig = require('../config/ip.config.js')
const api = {
  getCarList: ipConfig.api_puds + '/api-puds/v1/IAppVehicleController/getList',
  addCar: ipConfig.api_puds + '/api-puds/v1/IAppVehicleController/add',
  updateCar: ipConfig.api_puds + '/api-puds/v1/IAppVehicleController/update',
  setDefaultCar: ipConfig.api_puds + '/api-puds/v1/IAppVehicleController/isDefault'
}

// 车辆列表
export const getCarList = (params) => {
  return httpRequest.post({
    url: api.getCarList,
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

// 设置绑定车辆
export const setDefaultCar = (params) => {
  return httpRequest.post({
    url: api.setDefaultCar,
    data: params
  })
}
