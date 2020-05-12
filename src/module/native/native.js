import uni from 'uni'

// 获取当前环境
const getEnv = (callback) => {
  uni.getEnv(callback)
}

// 与webview交互  option { action, params }
const postMessage = (option) => {
  uni.postMessage({
    data: {
      action: option.action,
      params: option.params
    }
  })
}

// 跳转返回  option { url }
const navigateTo = (option) => {
  postMessage({
    action: 'navigateTo',
    params: option
  })
}

// 跳转返回  option { page }
const navigateBack = (option) => {
  postMessage({
    action: 'navigateBack',
    params: option
  })
}

// toast  option { String }
const toast = (option) => {
  postMessage({
    action: 'toast',
    params: { message: option }
  })
}

// notification  option { name, params }
const notification = (option) => {
  postMessage({
    action: 'notification',
    params: option
  })
}

export default {
  getEnv,
  postMessage,
  navigateTo,
  navigateBack,
  toast,
  notification
}
