import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
// import {} from ''
const network = (config: AxiosRequestConfig) => {
  const instance = axios.create({
    // http://localhost:3000
    baseURL: 'http://localhost:3000/',
    // baseURL: 'http://120.78.137.246:3000/',
    timeout: 5000
  })

  instance.interceptors.request.use(
    config => {
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
