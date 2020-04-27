import axios from 'axios'

// 基础请求类：httpClient
const httpClient = axios.create({
  baseURL: '',
  timeout: 60000
})

// 请求拦截器
httpClient.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
httpClient.interceptors.response.use(response => {
  // if (response.request.responseType === 'blob') {
  //   if (response.data.type === 'application/pdf' && response.request.responseURL.indexOf('previewpdf') !== -1) {
  //     return response.data
  //   }
  //   var contentDisposition = response.headers['content-disposition']
  //   var name = contentDisposition.substring(contentDisposition.indexOf('filename=') + 9, contentDisposition.length)
  //   const link = document.createElement('a')
  //   const blob = new Blob([response.data], { type: response.headers['content-type'] })
  //   link.style.display = 'none'
  //   link.href = URL.createObjectURL(blob)
  //   link.setAttribute('download', decodeURIComponent(name))
  //   document.body.appendChild(link)
  //   link.click()
  //   document.body.removeChild(link)
  // }
  // return response.data
  return response
}, error => {
  return Promise.reject(error)
})

// http请求方法封装
class HttpClient {
  // [{ key, value }]
	taskList = []

  //
  request = (option) => {
    const taskName = option.name || option.url || ''
    return new Promise((resolve, reject) => {
      const requestTask = httpClient(option).then(response => {
        if (Array.isArray(response) && response.length) {
          resolve(response[response.length - 1])
        } else {
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      }).finally(() => {
        this.removeTaskFromTaskList(taskName)
      })
      this.addTaskToTaskList(requestTask, taskName)
    })
  }

  addTaskToTaskList (task, name) {
    if (!(task && name)) { return }
    this.taskList.push({ key: name, value: task })
    // console.log('addTaskToTaskList', name, this.taskList)
  }

  removeTaskFromTaskList (name) {
    if (!name) { return }
    for (let i = this.taskList.length - 1; i >= 0; i--) {
      if (this.taskList[i].key === name) {
        this.taskList.splice(i, 1)
        // console.log('removeTaskFromTaskList', name, this.taskList)
      }
    }
  }

  // 取消http请求
  cancelRequest = (name) => {
    this.taskList.forEach(el => {
      if (el.key === name && el.value) {
        // el.value.abort()
        this.removeTaskFromTaskList(name)
      }
    })
  }
}

export default HttpClient
