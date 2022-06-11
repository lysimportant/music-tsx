import { defineComponent, watch, ref, reactive } from 'vue'
import { useMusic } from '@/stores/music'
import type lMusic from '@/library/l-music/l-music'
import { findMusicLyrics } from '@/api/music'
import {
  useOperateSendComment,
  useOperateCommentLike,
  useOperateReply
} from '@/hooks'
import { findSongComment } from '@/api/comment'
import LComment from '@/components/l-comment/l-comment'
import { useRoute } from 'vue-router'
const LRC = defineComponent({
  name: 'LRC',
  setup(props, { emit }) {
    const LMusic = ref<InstanceType<typeof lMusic>>()
    const route = useRoute()
    const MStore = useMusic()
    const lrc_ = ref([])
    const currentMusic = ref()
    const isPlay_ = ref(false)
    // 评论
    const CommentContainer = reactive({
      comments: [],
      hotComments: []
    })
    // 评论分页
    const reqCommentParams = reactive({
      limit: 30,
      offset: 0,
      total: 0
    })
    // 获取评论
    const getSongComment = async (id = MStore.currentMusic.id) => {
      const comment: any = await findSongComment({
        id,
        ...reqCommentParams
      })
      CommentContainer.comments = comment.comments
      CommentContainer.hotComments = comment.hotComments
      reqCommentParams.total = comment.total
    }
    getSongComment(route.params.id as any)
    watch(
      () => reqCommentParams,
      () => {
        getSongComment(MStore.currentMusic.id)
      },
      { deep: true, immediate: true }
    )
    const getLrc = e => {
      let lrcArr_: any = []
      const reg = /\[\d*:\d*(\.|:)\d*\]/g
      for (let i = 0; i < e.length; i++) {
        const regArr = e[i].match(reg)
        if (!regArr) continue
        const content = e[i].replace(regArr, '')
        lrcArr_.push(content)
      }
      lrc_.value = lrcArr_
    }
    watch(
      () => MStore.lrc,
      e => {
        getLrc(e)
        currentMusic.value = MStore.currentMusic
        isPlay_.value = MStore.isPlay
      },
      {
        deep: true,
        immediate: true
      }
    )
    watch(
      () => MStore.isPlay,
      e => {
        isPlay_.value = MStore.isPlay
      },
      {
        deep: true,
        immediate: true
      }
    )
    watch(
      () => MStore.currentMusic,
      e => {
        getSongComment(MStore.currentMusic.id)
        findMusicLyrics(MStore.currentMusic.id).then(res => {
          MStore.lrc = res.lrc.lyric.split('\n') ?? '暂无歌词'
        })
      },
      {
        deep: true,
        immediate: true
      }
    )
    const musicToggle = () => {
      LMusic.value?.toggle()
      MStore.isPlay = !MStore.isPlay
    }
    // 评论点赞
    const operateCommentLike = (item: any) => {
      useOperateCommentLike(0, item, route.params.id as any, getSongComment)
    }
    // 发表评论
    const operateSendComment = async (value: string) => {
      useOperateSendComment(0, route.params.id as any, value, getSongComment)
    }
    // 回复评论
    const operateReply_ = (item: any, content: string) => {
      useOperateReply(0, item, route.params.id as any, content, getSongComment)
    }
    const PaginationSizeChange = (item: any) => {
      reqCommentParams.limit = item.limit
      reqCommentParams.offset = 0
      getSongComment(MStore.currentMusic.id)
    }
    const PaginationCurrentChange = (item: any) => {
      reqCommentParams.offset = item.limit * (item.page - 1)
      getSongComment(MStore.currentMusic.id)
    }

    return {
      lrc_,
      currentMusic,
      isPlay_,
      CommentContainer,
      reqCommentParams,
      musicToggle,
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
        <div class="lrc-padd">
          <div class="lrc">
            <div class="lrc-left">
              <img
                onClick={() => {
                  this.musicToggle()
                  console.log('切换')
                }}
                class={`${this.isPlay_ ? 'music_play' : ''}`}
                src={this.currentMusic.picUrl}
                alt=""
              />
              <div>{this.currentMusic.songName}</div>
              <div
                onClick={() =>
                  // this.$router.push(`/user/${this.currentMusic.id}/detail`)
                  console.log('专辑')
                }
                class={`lrc-name`}
              >
                {this.currentMusic.singerName}
              </div>
            </div>
            <div class="lrc-right">
              <div class="lrc-container">
                {this.lrc_.map(item => {
                  return <p>{item}</p>
                })}
              </div>
            </div>
          </div>
          <LComment
            onOperateCommentLike={this.operateCommentLike}
            onOperateReply={this.operateReply_}
            onSendComment={this.operateSendComment}
            cols={127}
            total={this.reqCommentParams.total}
            hotComment={this.CommentContainer.hotComments}
            comment={this.CommentContainer.comments}
            onPaginationSizeChange={this.PaginationSizeChange}
            onPaginationCurrentChange={this.PaginationCurrentChange}
          ></LComment>
        </div>
      </div>
    )
  }
})

export default LRC
