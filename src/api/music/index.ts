import request from '@/utils/request'
//
/**
 * 获取音乐 URL
 * @param {Array} - id 音乐ID
 * @returns Promise
 */
export const findMusicURL = (id: [number]) => {
  return request(`/song/url?id=${id}`)
}

/**
 * 获取音乐详情
 * @param {Array} - ids 音乐ID
 * @returns Promise
 */
export const findMusicDetail = (ids: [number]) => {
  return request(`/song/detail?ids=${ids}`)
}

/**
 * 获取音乐歌词
 * @param {Integer} - ids 音乐ID
 * @returns Promise
 */
export const findMusicLyrics = (id: number) => {
  return request(`lyric`, { id })
}
