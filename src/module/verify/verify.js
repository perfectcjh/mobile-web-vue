// 用于数据校验
/**
 * 校验Email
 */
export function isValidityEmail (option) {
  if (!option) { return false }
  const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
  return regex.test(option)
}

/**
 * 校验手机号
 */
export function isValidityPhoneNumber (option) {
  if (!option) { return false }
  const regex = /^1[34578]\d{9}$/
  return regex.test(option)
}

/**
 * 校验密码等级
 */
export function verifyPasswordLevel (option) {
  if (!option) { return 0 }
  let level = 0
  // 判断这个字符串中有没有数字
  if (/[0-9]/.test(option)) {
    level++
  }
  // 判断字符串中有没有字母
  if (/[a-zA-Z]/.test(option)) {
    level++
  }
  // 判断字符串中有没有特殊符号
  if (/[^0-9a-zA-Z_]/.test(option)) {
    level++
  }
  return level
}
