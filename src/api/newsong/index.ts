import request from '@/utils/request'

/**
 *获取新音乐
 * @param {Integer} type -  地区类型 全部:0 华语:7  欧美:96 日本:8  韩国:16
 * @returns Promise
 */
export const findNewSong = (type: number) => {
  return request('/top/song', { type })
}
/**
 *获取新碟
 * @param {String} area -  ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 * @param {Integer} offset -  偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param {Integer} limit -  个数 默认 30
 * @returns Promise
 */
export const findDish = (area: string) => {
  return request('/album/new', { area })
}
