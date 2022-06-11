import request from '@/utils/request'
/**
 *获取歌单详情
 * @param {Integer} id - 歌单的ID
 * @returns Promise
 */
export const findSongDetail = (id: number) => {
  return request('/playlist/detail', {
    id,
    timestamp: Date.parse(new Date() + '')
  })
}

/**
 *获取所有歌单
 * @param {String} order - new & hot
 * @param {String} cat - 类型的标签
 * @param {Integer} limit - 个数
 * @param {Integer} offset - 偏移量个数
 * @returns Promise
 */
type SongList = {
  cat: string | null
  limit: number
  offset: number
}
export const findSongList = ({
  cat = null,
  limit = 10,
  offset = 0
}: SongList) => {
  return request('/top/playlist?order=hot', { cat, limit, offset })
}

/**
 *获取歌单标签
 * @returns Promise
 */
export const findSongCatList = () => {
  return request('/playlist/catlist')
}

/**
 *
 * @param {String} cat - 类型标签
 * @returns Promise
 */
export const findBoutique = (cat?: string) => {
  return request('/top/playlist/highquality?limit=1', { cat })
}

/**
 * 获取歌单的收藏者
 * @param {}
 * @returns Promise
 */
interface SongListHobby {
  id: string | number
  offset: number
  limit: number
}
export const findUserSongListHobby = ({ id, limit, offset }: SongListHobby) => {
  return request('/playlist/subscribers', {
    id,
    limit,
    offset,
    timestamp: Date.parse(new Date() + '')
  })
}

//

/**
 * 收藏歌单
 * @param {Integer} id - 歌单ID
 * @param {Integer} T - 1 收藏 0 取消收藏
 * @returns Promise
 */
interface SongListHobby {
  id: string | number
  offset: number
  limit: number
}
export const subSongList = (id: number, t: number) => {
  return request('/playlist/subscribe', {
    id,
    t,
    timestamp: Date.parse(new Date() + '')
  })
}
