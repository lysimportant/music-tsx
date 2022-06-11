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

/**
 * 发送评论
 * @param {Integer} type - 0: 歌曲  1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
 * @param {Integer} id - 资源ID
 * @param {String} content :要发送的内容
 * @param {Integer} t:1 发送, 2 回复
 * @param {Integer} commentId :回复的评论 id (回复评论时必填)
 * @returns Promise
 */
interface sendComment {
  commentId?: number
  content: string
  type: number
  id: number
  t: number
}
export const sendComment = ({
  type,
  id,
  content,
  t,
  commentId
}: sendComment) => {
  return request('/comment', {
    type,
    id,
    content,
    t,
    commentId,
    timestamp: Date.parse(new Date() + '')
  })
}

/**
 *
 * @param {Integer} id - 歌曲ID
 * @param {Boolean} like - true 为喜欢 false 位不喜欢
 * @returns Promise
 */
export const likeMusic = (id: number, like: boolean) => {
  return request('/like', { id, like, timestamp: Date.parse(new Date() + '') })
}
