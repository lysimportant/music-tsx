import request from '@/utils/request'
/**
 * 获取排行耪所有的详情
 * @returns Promise
 */
export const findLeaderBoardDetail = () => {
  return request('/toplist/detail')
}
