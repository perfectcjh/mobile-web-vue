// 用于处理时间日期格式化的方法

// 格式列表
const formatType = [
  { type: 1, format: 'YYYY-MM-DD HH:mm:ss' },
  { type: 2, format: 'YYYY-MM-DD' },
  { type: 3, format: 'YYYY/MM/DD HH:mm:ss' },
  { type: 4, format: 'YYYY/MM/DD' },
  { type: 5, format: 'YYYYMM' },
  { type: 6, format: 'YYYY-MM-DD HH:mm' },
  { type: 7, format: 'YYYY-MM' }
]

// 获取类型格式
const getFormatWithType = (type) => {
  let format = formatType[0].format
  formatType.forEach(element => {
    if (element.type === type) {
      format = element.format
    }
  })
  return format
}

/**
 * @description 日期转时间
 * format 格式
 * date 日期类型
 */
const dateFormat = (date, format) => {
  var tmpDate = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in tmpDate) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? tmpDate[k] : ('00' + tmpDate[k]).substr(('' + tmpDate[k]).length))
    }
  }
  return format
}

/**
 * @description 日期转成String类型
 */
export const dateToString = (date, type) => {
  if (!date) {
    return ''
  }
  return dateFormat(date, getFormatWithType(type))
}

/**
 * @description 日期字符串转成String类型
 */
export const formatDateStr = (dateStr, type) => {
  if (!dateStr) {
    return ''
  }
  const date = new Date(dateStr)
  return dateFormat(date, getFormatWithType(type))
}

/**
 * @description 获取当前时间String类型
 */
export const getCurrentDateStr = (type) => {
  const currentDate = new Date()
  return dateFormat(currentDate, getFormatWithType(type))
}

export default {
  dateToString,
  formatDateStr,
  getCurrentDateStr
}
