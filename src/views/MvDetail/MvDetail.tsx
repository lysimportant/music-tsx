import { defineComponent, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  findMVDetail,
  findMvURL,
  findSimiMv,
  findMvComment,
} from '@/api/mv'
import { operateComment } from '@/api/operate'
import LComment from '@/components/l-comment/l-comment'
import { playCountFormat, playSongTime } from '@/hooks'
import './style'
import Toast from '@/plugins/Toast'
const MvDetail = defineComponent({
  name: 'MvDetail',
  setup(props, { emit }) {
    const route = useRoute()
    // 评论
    const comment = ref()
    const hotComment = ref()
    const reqParams = reactive({
      id: route.params.id as string,
      total: 0,
      limit: 30,
      offset: 0
    })
    // 详情
    const mv = ref()
    // URL
    const mvURL = ref()
    // 相似
    const simiMv = ref()
    const getMVDetail = async () => {
      // 获取MV详情
      const { data } = await findMVDetail(reqParams.id)
      mv.value = data
      // 获取视频URL
      const res = await findMvURL(mv.value.id)
      mvURL.value = res.data.url
      // 获取相似MV
      const simiRes = await findSimiMv(mv.value.id)
      simiMv.value = simiRes.mvs
      getMvComment()
    }
    const getMvComment = async () => {
      // 获取MV评论
      const Comment = await findMvComment(reqParams)
      reqParams.total = Comment.total
      comment.value = Comment.comments
      hotComment.value = Comment.hotComments
      console.log('重新获取评论数据')
    }
    watch(
      () => route.params.id,
      () => {
        getMVDetail()
      },
      { immediate: true, deep: true }
    )
    const operateCommentLike = (item: any) => {
      const t = item.liked === true ? 0 : 1
      operateComment({
        type: 1,
        id: mv.value.id,
        cid: item.commentId,
        t
      }).then(async res => {
        if (res.code === 200 && t === 1) {
          await getMvComment()
          Toast('success', '点赞成功')
          return
        } else if (res.code === 200 && t === 0) {
          await getMvComment()
          Toast('info', '取消点赞')
          return
        } else {
          Toast('warning', '请求失败')
          return
        }
      })
    }
    return {
      mv,
      mvURL,
      simiMv,
      comment,
      hotComment,
      reqParams,
      operateCommentLike
    }
  },
  render() {
    return (
      <div class={`card`}>
        {this.mv ? (
          <div class="mv-detail-header">
            <div class="mv-detail-header-left">
              <video controls src={this.mvURL}></video>
              <div class="user-info">
                <img
                  src={this.mv.artists[0].img1v1Url ?? this.mv.cover}
                  alt=""
                />
                <span>{this.mv.artistName}</span>
              </div>
              <div class="mv-desc">
                <h1>{this.mv?.name}</h1>
                <el-popover
                  placement="bottom-start"
                  trigger="hover"
                  width={520}
                >
                  {{
                    reference: () => {
                      return <el-button>简介</el-button>
                    },
                    default: () => {
                      return <>{this.mv?.desc ?? '简介为空'}</>
                    }
                  }}
                </el-popover>
              </div>
            </div>
            <div class="mv-detail-header-right">
              {this.simiMv?.map(mv => {
                return (
                  <div
                    onClick={() => {
                      this.$router.push(`/mvdetail/${mv.id}`)
                    }}
                    class={`simi-mv-item`}
                  >
                    <div class="simi-mv-item-left">
                      <img src={mv.cover} alt="" />
                      <div class={`simi-mv-item-left-top`}>
                        <i class={`iconfont l-24gl-play`}></i>
                        {playCountFormat(mv.playCount)}
                      </div>
                      <div class={`simi-mv-item-left-bottom`}>
                        {playSongTime(mv.duration)}
                      </div>
                    </div>
                    <div class="simi-mv-item-right">
                      <div class={`simi-mv-item-right-top ellipsis-3`}>
                        {mv.name}
                      </div>
                      <div class={`simi-mv-item-right-bottom`}>
                        by {mv.artistName}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          ''
        )}
        <LComment
          onOperateCommentLike={this.operateCommentLike}
          comment={this.comment}
          hotComment={this.hotComment}
        ></LComment>
      </div>
    )
  }
})

export default MvDetail
