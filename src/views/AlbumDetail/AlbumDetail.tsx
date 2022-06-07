import { defineComponent, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findAlbumComment } from '@/api/comment'
import { findAlbumDetail } from '@/api/singer'
import type lMusic from '@/library/l-music/l-music'
import { useMusic } from '@/stores/music'
import {
  playCountFormat,
  timeFormat,
  playSongTime,
  useOperateSendComment,
  useOperateCommentLike,
  useOperateReply
} from '@/hooks'
import LComment from '@/components/l-comment/l-comment'
import './style'
const SongListDetail = defineComponent({
  name: 'SongListDetail',
  setup(props, { emit }) {
    const MStore = useMusic()
    const LMusic = ref<InstanceType<typeof lMusic>>()
    const route = useRoute()
    // 歌单详情
    const detail = ref()
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
    // 所有音乐
    const music = ref()
    // 活跃Tabs
    const activeName = ref('song')
    // 获取评论
    const getAlbumComment = async () => {
      const comment: any = await findAlbumComment({
        id: route.params.id as any,
        ...reqCommentParams
      })
      CommentContainer.comments = comment.comments
      CommentContainer.hotComments = comment.hotComments
      reqCommentParams.total = comment.total
    }

    // 检测
    watch(
      () => reqCommentParams,
      () => {
        getAlbumComment()
      },
      { deep: true, immediate: true }
    )
    // 获取歌单详情
    const getAlbumDetail = async (id: number) => {
      const res = await findAlbumDetail(id)
      detail.value = res
      getAlbumComment()
    }
    getAlbumDetail(route.params.id as any)
    const playMusic = (id: number) => {
      MStore.playMusic([id])
    }
    // 播放全部
    const playAll = () => {
      MStore.isPlay = false
      LMusic.value?.pause()
      MStore.playMusic(
        detail.value.songs.map(item => item.id),
        1
      )
    }
    // 评论点赞
    const operateCommentLike = (item: any) => {
      useOperateCommentLike(3, item, detail.value.album.id, getAlbumComment)
    }
    // 发表评论
    const operateSendComment = async (value: string) => {
      useOperateSendComment(3, detail.value.album.id, value, getAlbumComment)
    }
    // 回复评论
    const operateReply_ = (item: any, content: string) => {
      useOperateReply(3, item, detail.value.album.id, content, getAlbumComment)
    }
    const PaginationSizeChange = (item: any) => {
      reqCommentParams.limit = item.limit
      reqCommentParams.offset = 0
      getAlbumComment()
    }
    const PaginationCurrentChange = (item: any) => {
      reqCommentParams.offset = item.limit * (item.page - 1)
      getAlbumComment()
    }

    return {
      detail,
      music,
      activeName,
      CommentContainer,
      reqCommentParams,
      PaginationSizeChange,
      PaginationCurrentChange,
      playMusic,
      playAll,
      operateCommentLike,
      operateSendComment,
      operateReply_
    }
  },
  render() {
    return (
      <div class={`card`}>
        <div class="songlist-detail-header">
          {/* 左边 */}
          <div class="songlist-detail-header-left">
            <img src={this.detail?.album.picUrl} alt="" />
          </div>
          {/* 右边 */}
          <div class="songlist-detail-header-right">
            <h1 class={`albumTitle`}>{this.detail?.album.name}</h1>
            {/* 操作 */}
            <div class="operate">
              <el-button onClick={() => this.playAll()} type="danger">
                <i class={`iconfont l-24gl-play`}></i>
                播放全部
              </el-button>

              <el-button style={`text-center: center;`}>
                <i class={`iconfont l-shoucang`}></i>
                收藏 {playCountFormat(this.detail?.subscribedCount)}
              </el-button>
            </div>
            {/* 用户信息 */}
            <div>
              歌手:
              {this.detail?.album.artists.map((item, index) => {
                return (
                  <>
                    <span
                      class={`active`}
                      onClick={() => {
                        this.$router.push(
                          `/singerdetail/${this.detail.album.artists[index].id}`
                        )
                      }}
                    >
                      {item.name}
                    </span>
                    {index < this.detail.album.artists.length - 1 ? (
                      <i>/</i>
                    ) : (
                      ''
                    )}
                  </>
                )
              })}
            </div>
            <div>创建时间: {timeFormat(this.detail?.createTime)} </div>
          </div>
        </div>
        <div class={`songlist-body`}>
          <el-tabs v-model={this.activeName}>
            <el-tab-pane label="歌曲列表" name="song">
              <el-button
                onClick={() => {
                  this.detail.songs.reverse()
                }}
              >
                换排序
              </el-button>
              <el-table
                highlight-current-row
                onRowClick={e => {
                  this.playMusic(e.id)
                }}
                data={this.detail?.songs}
                stripe
              >
                <el-table-column align="center" type="index" width="50" />
                <el-table-column prop="name" label="标题" />
                <el-table-column
                  align="center"
                  width="200"
                  prop="ar[0].name"
                  label="歌手"
                />
                <el-table-column align="center" prop="al.name" label="专辑" />
                <el-table-column
                  align="center"
                  width="180"
                  v-slots={{
                    default: scope => {
                      return <>{playSongTime(scope.row.dt)}</>
                    }
                  }}
                  label="时长"
                />
              </el-table>
            </el-tab-pane>
            <el-tab-pane
              label={`评论 ${this.reqCommentParams.total}`}
              name="comment"
            >
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
            </el-tab-pane>
            <el-tab-pane label={`专辑详情`} name="desc">
              <pre style={`font-size: 20px;`}>
                {this.detail?.album.description}
              </pre>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    )
  }
})

export default SongListDetail
