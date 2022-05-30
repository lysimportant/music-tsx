import request from '@/utils/request'
/**
 *获取歌单详情
 * @param {Integer} id - 歌单的ID
 * @returns Promise
 */
export const findSongDetail = (id: number) => {
  return request('/playlist/detail', { id })
}
