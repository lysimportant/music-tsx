import request from '@/utils/request'
/**
 * 获取歌手列表
 * @param {Integer} limit - 返回数量 , 默认为 30
 * @param {Integer} offset -  偏移数量，用于分页
 * @param {Integer} type - -1 全部 1 男歌手 2 女歌手 3 乐队
 * @param {Integer} initial - 按首字母索引查找参数 a - z 热门传-1,#传 0
 * @param {Integer} area - -1 全部 7华语  96欧美  8:日本  16韩国  0:其他
 * @returns Promise
 */
export interface ArtistType {
  limit: number
  offset: number
  type: number
  area: number
  initial: string | number
}
export const findArtist = ({
  limit,
  offset,
  type,
  area,
  initial
}: ArtistType) => {
  return request('/artist/list', {
    limit,
    offset,
    type,
    initial,
    area
  })
}

/**
 * 获取歌手详情
 * @param {Integer|String} id - 歌手的ID
 * @returns Promise
 */
export const findArtistDetail = (id: number | string) => {
  return request('/artist/detail', { id })
}

/**
 * 获取歌手前五十的热门歌曲
 * @param {Integer|String} id 歌手ID
 * @returns Promise
 */
export const findArtistTopSong = (id: number | string) => {
  return request('/artist/top/song', { id })
}

/**
 * 获取歌手专辑ID
 * @param {Integer|String} ID - 歌手ID
 * @param {Integer} limit - 取出数量 , 默认为 50
 * @param {Integer} offset - 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * @returns Promise
 */
export const findArtistAlbum = (id: number | string) => {
  return request('/artist/album?limit=20', { id })
}

/**
 * 获取专辑内容
 * @param {Integer|String} ID - 专辑ID
 * @returns Promise
 */
export const findAlbumDetail = (id: number | string) => {
  return request('/album', { id })
}

/**
 * 获取歌手描述
 * @param {Integer|String} ID - 歌手ID
 * @returns Promise
 */
export const findArtistDesc = (id: number | string) => {
  return request('/artist/desc', { id })
}

/**
 * 获取相似歌手
 * @param {Integer|String} ID - 歌手ID
 * @returns Promise
 */
export const findSimiArtist = (id: number | string) => {
  return request('/simi/artist', { id })
}

/**
 * 获取歌手MV
 * @param {Integer|String} ID - 歌手ID
 * @returns Promise
 */
export const findArtistMV = (id: number | string) => {
  return request('/artist/mv?limit=80', { id })
}
