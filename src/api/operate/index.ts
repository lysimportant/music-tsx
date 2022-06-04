import request from '@/utils/request'

/**
 * 给(多个)评论点赞
 * @param {Integer} type - 0: 歌曲  1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
 * @param {Integer} id - 资源ID
 * @param {Integer} cid - 评论的ID
 * @param {Integer} t - 操作 1 点赞 0 取消点赞
 * @returns Promise
 */
interface operateComment {
  type: number
  id: number
  cid: number
  t: number
}
export const operateComment = ({ type, id, cid, t }: operateComment) => {
  return request('/comment/like', {
    type,
    id,
    cid,
    t,
    timestamp: Date.parse(new Date() + '')
  })
}
