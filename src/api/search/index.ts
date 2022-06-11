import request from '@/utils/request'
/**
 *  热门搜索列表
 * @param {}
 * @returns Promise
 */
export const searchHot = () => {
  return request('/search/hot')
}

/**
 *  搜索默认
 * @param {}
 * @returns Promise
 */
export const defaultSearch = () => {
  return request('/search/default')
}

// ?keywords=海阔天空

/**
 *  搜索
 * @param {String} keywords  -  搜索关键字
 * @param {Number} limit  -  返回数量 , 默认为 30
 * @param {Number} offset  -   offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param {Number} type -  1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
 * @returns Promise
 */
export const search = ({
  keywords = '',
  limit = 500,
  offset = 0,
  type = 1
}) => {
  return request('/search', { keywords, limit, offset, type })
}
