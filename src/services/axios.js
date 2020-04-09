import axios from 'axios'
import envConfig from '@/config'
import storage from '@/plugins/storage'
import {Loading, Message} from 'element-ui'
import router from '../router'

axios.defaults.baseURL = envConfig.baseURL
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

let loadingInstance
let tokenKeyName = envConfig.tokenKeyName

axios.interceptors.request.use((config) => {
  if (storage.get(tokenKeyName)) {
    config.headers[tokenKeyName] = storage.get(tokenKeyName)
  }
  if (config.showLoading !== false) {
    loadingInstance = Loading.service({fullscreen: true})
  }
  return config
}, (error) => {
  loadingInstance.close()
  return Promise.reject(error)
})

axios.interceptors.response.use(function (res) {
  if (loadingInstance) {
    loadingInstance.close()
  }
  if (res.data.code === '401') {
    router.push({
      path: '/login'
    })
    return new Promise(() => {
    })
  }
  if (res.data.error !== 1) {
    return res.data
  } else {
    // 错误提示
    Message({
      message: res.data.message,
      type: 'error',
      center: true
    })
    return new Promise(() => {
    })
  }
}, function (error) {
  if (loadingInstance) {
    loadingInstance.close()
  }
  Message({
    message: '网络错误',
    type: 'error'
  })
  return Promise.reject(error)
})
export default axios
