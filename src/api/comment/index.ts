import request from '@/utils/request'
import type { CommentType } from '../config'

/**
 *
 * @param {}
 * @returns Promise
 */
// 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
export const findAllComment = (
  type: number,
  id: number | String,
  offset: number
) => {
  return request('/comment/new?sortType=2', {
    type,
    id,
    offset,
    timestamp: Date.parse(new Date() + '')
  })
}

/**
 * 获取歌单评论
 * @param {Integer|String} id - 歌单 的 ID
 * @param {Integer} limit - 一次拿出的评论数量
 * @param {Integer|String} offset - 评论的分页
 * @returns Promise
 */
export const findSongListComment = ({ id, offset, limit }: CommentType) => {
  return request('/comment/playlist', {
    id,
    offset,
    limit,
    timestamp: Date.parse(new Date() + '')
  })
}

/**
 * 获取专辑评论
 * @param {Integer|String} ID - 专辑ID
 * @param {Integer} limit - 拉取评论的个数
 * @param {Integer} offset - 评论的偏移个数
 * @returns Promise
 */

export const findAlbumComment = ({ id, limit, offset }: CommentType) => {
  return request('/comment/album', {
    id,
    limit,
    offset,
    timestamp: Date.parse(new Date() + '')
  })
}
