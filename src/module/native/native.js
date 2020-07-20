
// 原生交互调用方法
const postMessage = (option) => {
  const userAgent = navigator.userAgent
  const isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1 // android终端
  const isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端

  const action = option.action
  const params = option.params

  if (isiOS) {
    if (window.webkit && window.webkit.messageHandlers) {
      const jsonStr = JSON.stringify(params)
      window.webkit.messageHandlers[action].postMessage(jsonStr)
    }
  }
  if (isAndroid) {
    // window[action]
  }
}

// 页面跳转
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

// 跳转返回root   option nil
const navigateBackToRoot = (option) => {
  postMessage({
    action: 'navigateBackToRoot',
    params: option
  })
}

// 跳转返回  option { page }
const setStorage = (option) => {
  postMessage({
    action: 'navigateBack',
    params: option
  })
}

// 跳转返回  option { page }
const getStorage = (option) => {
  postMessage({
    action: 'navigateBack',
    params: option
  })
}

// 跳转返回  option { page }
const removeStorage = (option) => {
  postMessage({
    action: 'navigateBack',
    params: option
  })
}

// 选择图片  option { count }
const chooseImage = (option, callback) => {
  window.didFinishChooseImage = (value) => {
    const images = value.images.map(el => {
      return 'data:image/png;base64,' + el
    })
    callback(images)
  }
  option.callback = 'didFinishChooseImage'
  postMessage({
    action: 'chooseImage',
    params: option
  })
}

// 拨打电话  option { phoneNumber }
const makePhoneCall = (option) => {
  postMessage({
    action: 'makePhoneCall',
    params: option
  })
}

// 全局通知  option { name, value }
const postNotification = (option) => {
  postMessage({
    action: 'postNotification',
    params: option
  })
}

// 设置导航栏  option { title }
const setNavigationBar = (option) => {
  postMessage({
    action: 'setNavigationBar',
    params: option
  })
}

// log  option { title }
const log = (option) => {
  postMessage({
    action: 'log',
    params: option
  })
}

export default {
  navigateTo,
  navigateBack,
  navigateBackToRoot,
  setStorage,
  getStorage,
  removeStorage,
  chooseImage,
  makePhoneCall,
  postNotification,
  setNavigationBar,
  log
}
