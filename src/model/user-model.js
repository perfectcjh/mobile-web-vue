import api from '@/api/index.js'

let loginToken = ''
let loginUserInfo = {}

const getToken = () => {
  return loginToken
}

const setToken = (token) => {
  loginToken = token
}

const isLogin = () => {
  return getToken()
}

const getUserInfo = () => {
  return loginUserInfo
}

const setUserInfo = (userInfo) => {
  loginUserInfo = userInfo
}

const requestUserInfo = async () => {
  const { code, data } = await api.getLoginUserInfo()
  if (code === 200) {
    const userAuthRes = await api.getDriverDetail({ userId: data.id })
    if (userAuthRes.code === 200) {
      data.userAuthInfo = userAuthRes.data

      if (userAuthRes.data && userAuthRes.data.id) {
        const carInfoRes = await api.getCarList({ page: 1, size: 100, driverId: userAuthRes.data.id })
        data.carInfo = carInfoRes.data
      }
    }
    setUserInfo(data)
  }
  return Promise.resolve({ code, data })
}

export default {
  getToken,
  setToken,
  isLogin,
  getUserInfo,
  setUserInfo,
  requestUserInfo
}
