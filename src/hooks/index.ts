import { ref } from 'vue'
import { operateComment, sendComment, likeMusic } from '@/api/operate'
import { useUser } from '@/stores/user'
import { userSubList } from '@/api/user'
import Toast from '@/plugins/Toast'
import dayjs from 'dayjs'
import { useIntersectionObserver } from '@vueuse/core'
export const playCountFormat = (count: number) => {
  if (count > 100000000) {
    return (count / 100000000).toFixed(2) + '亿'
  } else if (count > 10000) {
    return (count / 10000).toFixed(0) + '万'
  } else {
    return count
  }
}
export const playSongTime = (time: number) => {
  return dayjs(time).format('mm:ss')
}
export const timeFormat = (timestamp: number) => {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm')
}
/**
 *数据懒加载
 * @param { Object } target - DOM Object
 * @param { Function } apiFn - API 函数
 * */
export const useLazyData = (apiFn: Function) => {
  let result = ref([]) // 返回的数据存储
  const target = ref<InstanceType<typeof HTMLElement>>() // DOM元素的存储
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting 是否进入元素可视区
      if (isIntersecting) {
        stop()
        // API函数的调佣
        apiFn().then((res: any) => {
          result.value = res.result
        })
      }
    }
  )
  return { result, target }
}
export const isLoginStatus = (): any => {
  let isLogin = ref(false)
  const res = JSON.parse(window.localStorage.getItem('pinia-useUser') as string)
  if (res?.profile) {
    const { profile } = res
    isLogin.value = profile.code ? true : false
  }
  console.log(isLogin.value)
  return isLogin
}
export const getProfileLocal = (): any => {
  const res = JSON.parse(window.localStorage.getItem('pinia-useUser') as string)
  return res
}

// 评论点赞
export const useOperateCommentLike = (
  type: number,
  item: any,
  id: number,
  fn: Function
) => {
  const isLogin = isLoginStatus()
  if (isLogin.value) {
    const t = item.liked === true ? 0 : 1
    operateComment({
      type,
      id,
      cid: item.commentId,
      t
    }).then(res => {
      setTimeout(async () => {
        if (res.code === 200 && t === 1) {
          await fn()
          Toast('success', '点赞成功')
          return
        } else if (res.code === 200 && t === 0) {
          Toast('info', '取消点赞')
          await fn()
          return
        } else {
          Toast('warning', '请求失败')
          return
        }
      }, 500)
    })
  } else {
    Toast('warning', '亲 请先登录,再操作')
  }
}
export const useOperateSendComment = async (
  type: number,
  id: number,
  content: string,
  fn: Function
) => {
  const isLogin = isLoginStatus()
  if (isLogin.value) {
    if (content.length < 1) return Toast('info', '文采不能为空噢~')
    await sendComment({
      content,
      t: 1,
      id,
      type
    })
    setTimeout(() => {
      Toast('success', '文采发送成功~')
      fn()
    }, 500)
  } else {
    return Toast('warning', '亲 请先登录 再发表文采!')
  }
}

// 回复评论
export const useOperateReply = (
  type: number,
  item: any,
  id: number,
  content: string,
  fn: Function
) => {
  const isLogin = isLoginStatus()
  if (isLogin.value) {
    sendComment({
      type,
      id,
      content,
      t: 2,
      commentId: item.commentId
    })
      .then(res => {
        setTimeout(() => {
          Toast('success', '回复评论成功~')
          fn()
        }, 500)
      })
      .catch(err => Toast('error', '回复失败'))
  } else {
    return Toast('warning', '亲 请先登录 再回复文采!')
  }
}

export const useOperateLikeMusic = async (id: number, userId) => {
  const res = useUser().likeList.findIndex(ids => ids === id)
  if (res === -1) {
    // 收藏
    Toast('success', '已为您添加到歌曲喜欢')
    await likeMusic(id, true)
  } else {
    // 取消收藏
    Toast('success', '已为您取消该歌曲喜欢')
    await likeMusic(id, false)
  }

  const list = await userSubList(userId)
  return (useUser().likeList = list.ids)
}
