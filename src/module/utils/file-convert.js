
// base64转为file
export const base64ToFile = (base64String, filename) => {
  var arr = base64String.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// blob转为file
export const blobToFile = (newBlob, fileName) => {
  newBlob.lastModifiedDate = new Date()
  newBlob.name = fileName
  return newBlob
}

// base64转为blob
export const convertBase64ToBlob = (base64String) => {
  var arr = base64String.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

export default {
  base64ToFile,
  blobToFile,
  convertBase64ToBlob
}
