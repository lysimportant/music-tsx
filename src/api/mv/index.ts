import request from '@/utils/request'

/**
 * 获取所有的MV
 * @param {String} order - 排序,可选值为上升最快,最热,最新,不填则为上升最快
 * @param {String} area - 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * @param {Integer} type - 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * @param {Integer} limit - 取出数量 , 默认为 30
 * @param {Integer} offset: - 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * @returns Promise
 */
type MV = {
  order: string
  area: string
  type: string
  limit: number
  offset: number
}
export const findAllMV = ({ order, area, type, limit, offset }: MV) => {
  return request('/mv/all', {
    order,
    area,
    type,
    limit,
    offset,
    timestamp: Date.parse(new Date() + '')
  })
}

/**
 * 获取mv详情数据
 * @param {Integer|String} mvid - MV 的 ID
 * @returns Promise
 */
export const findMVDetail = (mvid: number | String) => {
  return request('/mv/detail', { mvid })
}

/**
 * 获取mv 播放 URL
 * @param {Integer|String} id - MV 的 ID
 * @returns Promise
 */
export const findMvURL = (id: number | String) => {
  return request('/mv/url', { id })
}

/**
 * 获取相似MV
 * @param {Integer|String} mvid - MV 的 ID
 * @returns Promise
 */
export const findSimiMv = (mvid: number | String) => {
  return request('/simi/mv', { mvid })
}

/**
 * 获取MV评论
 * @param {Integer|String} id - MV 的 ID
 * @param {Integer|String} offset - 评论的分页
 * @returns Promise
 */
interface MvComment {
  id: string | number
  offset: number
  limit: number
}
export const findMvComment = ({ id, offset, limit }: MvComment) => {
  return request('/comment/mv', {
    id,
    offset,
    limit,
    timestamp: Date.parse(new Date() + '')
  })
}
