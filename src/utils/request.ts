import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import Toast from '@/plugins/Toast'
import { startLoading, endLoading } from '@/plugins/loading'
const network = (config: AxiosRequestConfig) => {
  const instance = axios.create({
    // http://localhost:3000
    // baseURL: 'http://localhost:3000/',
    // baseURL: 'http://124.221.63.19:3000/',
    baseURL: 'https://lianghj.top:3000/',
    timeout: 20000,
    withCredentials: true
  })

  instance.interceptors.request.use(
    config => {
      console.log(config.url)
      if(config.url !== '/login/qr/check'){
        startLoading('数据拼命加载中.....')
      }
      return config
    },
    err => {
      return Promise.reject(new Error(err))
    }
  )

  instance.interceptors.response.use(
    response => {
      endLoading()
      return response.data
    },
    err => {
      endLoading()
      if (err.response?.data) {
        if (err.response.data.code === 406) {
          return Toast('warning', err.response.data.msg)
        }
        if (err.response.data.code === 501) {
          return Toast('error', err.response.data.msg + ' 扫码登录更快噢~')
        }
        if (err.response.data.code === -462) {
          return Toast(
            'error',
            '官方限制: 请您到  ' + err.response.data.data.blockText
          )
        }
      }
      Toast('warning', '网络不太好呢,刷新一下')
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
