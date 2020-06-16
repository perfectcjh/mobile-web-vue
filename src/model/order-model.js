import { formatFloat } from '@/module/formatter/data-formatter.js'

const getOrderStatusText = (status) => {
  if (status === '1') {
    return '待接单'
  } else if (status === '2') {
    return '待提货'
  } else if (status === '3') {
    return '执行中'
  } else {
    return '已完成'
  }
}

const getButtonTitle = (logisticsStatus) => {
  if (logisticsStatus === 'take_order') {
    return '提货'
  } else if (logisticsStatus === 'pickup') {
    return '卸货'
  } else if (logisticsStatus === 'arrived') {
    return '签收'
  } else {
    return ''
  }
}

const getButtonFinishTitle = (logisticsStatus) => {
  if (logisticsStatus === 'take_order') {
    return '提货完成'
  } else if (logisticsStatus === 'pickup') {
    return '卸货完成'
  } else if (logisticsStatus === 'arrived') {
    return '签收'
  } else {
    return ''
  }
}

const OrderListModel = (data) => {
  const orderList = []
  if (data) {
    data.forEach(el => {
      const orderModel = OrderDetailModel(el)
      orderList.push(orderModel)
    })
  }
  return orderList
}

const OrderDetailModel = (data) => {
  const detailData = {
    orderId: data.id,
    orderNo: data.departCode,
    orderStatus: data.departStatus, // (1-新建；2-待执行；3-执行中；4-完成)
    orderStatusText: getOrderStatusText(data.departStatus),

    carPlateNo: data.headPlateNo,
    // 收货发货信息
    picker: data.consignor,
    pickerPhone: data.consignorPhone,
    receipter: data.receiver,
    receipterPhone: data.receiverPhone,
    locationFrom: `${data.pickProvince || ''}${data.pickCity || ''}`,
    locationTo: `${data.receiptProvince || ''}${data.receiptCity || ''}`,
    pickProvince: data.pickProvince || '',
    receiptProvince: data.receiptProvince || '',
    pickCity: data.pickCity || '',
    receiptCity: data.receiptCity || '',
    pickArea: data.pickArea || '',
    receiptArea: data.receiptArea || '',
    pickTotalAddress: `${data.pickProvince || ''}${data.pickCity || ''}${data.pickArea || ''}${data.pickAddress || ''}`,
    receiptTotalAddress: `${data.receiptProvince || ''}${data.receiptCity || ''}${data.receiptArea || ''}${data.receiptAddress || ''}`,
    pickDateTime: data.pickDateTime || data.pickDate,
    receiptDateTime: data.receiptDateTime || data.receiptDate,

    moneyAmount: data.amount,
    moneyAmountShow: `${formatFloat(data.amount, 2)}`,
    transportCompany: data.companyName,

    remark: data.remark
  }
  const detailList = []
  if (data.details) {
    data.details.forEach(el => {
      const detailObj = {
        orderId: el.id,
        orderNo: el.customerOrderNo,
        parentOrderId: data.id,
        // 收货发货信息
        picker: el.consignor,
        pickerPhone: el.consignorPhone,
        receipter: el.receiver,
        receipterPhone: el.receiverPhone,
        pickProvince: data.pickProvince || '',
        receiptProvince: data.receiptProvince || '',
        pickCity: data.pickCity || '',
        receiptCity: data.receiptCity || '',
        pickArea: data.pickArea || '',
        receiptArea: data.receiptArea || '',
        pickTotalAddress: `${el.pickProvince || ''}${el.pickCity || ''}${el.pickArea || ''}${el.pickAddress || ''}`,
        receiptTotalAddress: `${el.receiptProvince || ''}${el.receiptCity || ''}${el.receiptArea || ''}${el.receiptAddress || ''}`,
        pickDateTime: el.pickDateTime || el.pickDate,
        receiptDateTime: el.receiptDateTime || el.receiptDate,
        // 货物信息
        goodsName: el.goodsName,
        goodsQuantity: el.quantity,
        goodsQuantityShow: `${el.quantity}件`,
        goodsWeight: el.grossWeight,
        goodsWeightShow: `${formatFloat(el.grossWeight, 2)}KG`,
        goodsVolume: el.volume,
        goodsVolumeShow: `${formatFloat(el.volume, 2)}立方米`,
        // 物流信息
        // [not_start-未开始, take_order-司机接单, pickup-提货完成, arrived-到达目的地, singed-提货完成]
        // logisticsStatus: 'take_order',
        // logisticsStatus: 'pickup',
        // logisticsStatus: 'arrived',
        logisticsStatus: el.logisticsStatus,
        remark: el.remark
      }
      const orderInfoTags = []
      if (detailObj.goodsName) {
        orderInfoTags.push(detailObj.goodsName)
      }
      if (detailObj.goodsQuantity) {
        orderInfoTags.push(detailObj.goodsQuantityShow)
      }
      if (detailObj.goodsWeight) {
        orderInfoTags.push(detailObj.goodsWeightShow)
      }
      if (detailObj.goodsVolume) {
        orderInfoTags.push(detailObj.goodsVolumeShow)
      }
      detailObj.orderInfoTags = orderInfoTags
      detailList.push(detailObj)
    })
    detailData.logisticsStatus = data.details[0].logisticsStatus
    // detailData.logisticsStatus = 'take_order'
    // detailData.logisticsStatus = 'pickup'
    // detailData.logisticsStatus = 'arrived'
    detailData.buttonTitle = getButtonTitle(detailData.logisticsStatus)
    detailData.buttonFinishTitle = getButtonFinishTitle(detailData.logisticsStatus)
  }
  detailData.detailList = detailList
  return detailData
}

export {
  OrderListModel,
  OrderDetailModel
}
