import request from '@/utils/request'
/**
 * 获取首页的轮播图数据
 * @param {String} type - 获取客户端标识 0 PC 1 Andorid ...
 * @returns Promise
*/
export const findBanner = () => {
  return request('/banner?type=0')
}

/**
 * 获取推荐歌单
 * @param {Integer} limit - 请求的数量 默认为 30
 * @returns Promise
*/

export const findRecommendSongList = (limit = 10) => {
  return request(`/personalized?limit=${limit}`)
}
/**
 * 获取新音乐
 * @param {Integer} - limit 一次拉出的数量 默认值为 10 个
 * @returns Promise
*/

export const findNewSong = () => {
  return request('/personalized/newsong')
}
