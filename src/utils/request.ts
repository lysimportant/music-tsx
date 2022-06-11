import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
// import Cookies from 'js-cookie'
import npro from 'nprogress'
import Toast from '@/plugins/Toast'
// import {} from ''
const network = (config: AxiosRequestConfig) => {
  const instance = axios.create({
    // http://localhost:3000
    // baseURL: 'http://localhost:3000/',
    // baseURL: 'http://124.221.63.19:3000/',
    baseURL: 'https://lianghj.top:3000/',
    timeout: 5000,
    withCredentials: true
  })

  instance.interceptors.request.use(
    config => {
      npro.start()
      const res = JSON.parse(
        window.localStorage.getItem('pinia-useUser') as string
      )
      if (res) {
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
      npro.done()
      return response.data
    },
    err => {
      npro.done()
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
