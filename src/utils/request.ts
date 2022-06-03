import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import Toast from '@/plugins/Toast'
// import {} from ''
const network = (config: AxiosRequestConfig) => {
  const instance = axios.create({
    // http://localhost:3000
    // baseURL: 'http://localhost:3000/',
    baseURL: 'http://124.221.63.19:3000/',
    // baseURL: 'http://120.78.137.246:3000/',
    timeout: 5000,
    withCredentials: true
  })

  instance.interceptors.request.use(
    config => {
      const res = JSON.parse(window.localStorage.getItem('pinia-useUser') as string)
      if(res) {
        const { cookie } = res.profile
        // config!.headers.Authorization = cookie
      }

      return config
    },
    err => {
      return Promise.reject(new Error(err))
    }
  )

  instance.interceptors.response.use(
    response => {
      return response.data
    },
    err => {
      if (err.response?.data) {
        if (err.response.data.code === 406) {
          return Toast('warning', err.response.data.msg)
        }
        if (err.response.data.code === 501) {
          return Toast('error', err.response.data.msg)
        }
        if (err.response.data.code === -462) {
          return Toast('warning', '请先登录~')
        }
      }
      console.log(err)
      Toast('warning', '网络不太好,请刷新网页')

      return Promise.reject(new Error(err))
    }
  )

  return instance(config)
}

export default function (url: string, data?: any, method = 'get') {
  return network({
    method,
    url,
    [method.toLocaleLowerCase() === 'get' ? 'params' : 'data']: data
  })
}
