import request from '@/utils/request'

export const findDJDetail = (rid: string | number) => {
  return request('/dj/detail', { rid })
}

export const findDJProgram = (rid: string) => {
  return request('/dj/program', { rid })
}
