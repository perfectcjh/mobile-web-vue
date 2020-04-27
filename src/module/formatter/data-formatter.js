// 用于处理数据格式化的方法

/**
 * @description 四舍五入保留小数
 * @param {Number} value 需要格式化的值
 * @param {Number} n 保留的小数位数
 * @returns {Number} 结果
 */
export const formatFloat = (value, n) => {
  if (!value) { return 0 }
  if (!n) {
    n = 0
  }
  const powValue = Math.pow(10, n)
  const newV = Math.round(Number(value) * powValue) / powValue
  return newV.toFixed(n)
}

/**
 * @description 字符串转二进制
 */
export const strToBinary = (str) => {
  var result = []
  var list = str.split('')
  for (var i = 0; i < list.length; i++) {
    if (i !== 0) {
      result.push(' ')
    }
    var item = list[i]
    var binaryStr = item.charCodeAt().toString(2)
    result.push(binaryStr)
  }
  return result.join('')
}
