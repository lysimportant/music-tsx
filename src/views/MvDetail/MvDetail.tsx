import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findMVDetail, findMvURL, findSimiMv, findMvComment } from '@/api/mv'
import { operateComment, sendComment } from '@/api/operate'
import LComment from '@/components/l-comment/l-comment'
import {
  playCountFormat,
  playSongTime,
  isLoginStatus,
  useOperateCommentLike,
  useOperateSendComment,
  useOperateReply
} from '@/hooks'
import './style'
const MvDetail = defineComponent({
  name: 'MvDetail',
  setup(props, { emit }) {
    const route = useRoute()
    // 评论
    const comment = ref()
    const hotComment = ref()
    const reqParams = reactive({
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
    const getMvComment = async () => {
      const Comment: any = await findMvComment({
        id: route.params.id as string,
        ...reqParams
      })
      reqParams.total = Comment.total
      comment.value = Comment.comments
      hotComment.value = Comment.hotComments
      console.log('重新获取评论数据')
    }
    const getMVDetail = async () => {
      // 获取MV详情
      const { data } = await findMVDetail(route.params.id as string)
      mv.value = data
      // 获取视频URL
      const res = await findMvURL(mv.value.id)
      mvURL.value = res.data.url
      // 获取相似MV
      const simiRes: any = await findSimiMv(mv.value.id)
      simiMv.value = simiRes.mvs
      getMvComment()
    }
    // 获取MV评论

    // 初始化数据
    watch(
      () => route.params.id,
      () => {
        getMVDetail()
      },
      { immediate: true, deep: true }
    )
    // 评论点赞
    const operateCommentLike = (item: any) => {
      useOperateCommentLike(1, item, mv.value.id, getMvComment)
    }
    // 发表评论
    const operateSendComment = async (value: string) => {
      useOperateSendComment(1, mv.value.id, value, getMvComment)
    }
    // 回复评论
    const operateReply_ = (item: any, content: string) => {
      useOperateReply(1, item, mv.value.id, content, getMvComment)
    }
    const PaginationSizeChange = (item: any) => {
      reqParams.limit = item.limit
      reqParams.offset = 0
      getMvComment()
    }
    const PaginationCurrentChange = (item: any) => {
      reqParams.offset = item.limit * (item.page - 1)
      getMvComment()
    }
    return {
      mv,
      mvURL,
      simiMv,
      comment,
      hotComment,
      reqParams,
      operateCommentLike,
      operateSendComment,
      operateReply_,
      PaginationSizeChange,
      PaginationCurrentChange
    }
  },
  render() {
    return (
      <div class={`card`}>
        {this.mv ? (
          <div class="mv-detail-header">
            <div class="mv-detail-header-left">
              <h1>MV详情</h1>
              <video autoplay controls src={this.mvURL}></video>
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
              <h1>相关推荐</h1>
              {this.simiMv?.map((mv: any) => {
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
          onSendComment={this.operateSendComment}
          onOperateReply={this.operateReply_}
          comment={this.comment}
          hotComment={this.hotComment}
          total={this.reqParams.total}
          onPaginationSizeChange={this.PaginationSizeChange}
          onPaginationCurrentChange={this.PaginationCurrentChange}
        ></LComment>
      </div>
    )
  }
})

export default MvDetail
