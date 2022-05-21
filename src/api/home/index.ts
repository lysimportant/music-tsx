import request from '@/utils/request'

export const findBanner = () => {
  return request('/banner')
}
