import {
  defineComponent,
  reactive,
  ref,
  watch,
  withModifiers,
  computed
} from 'vue'
import { useRoute } from 'vue-router'
import { findSongListComment } from '@/api/comment'
import {
  findSongDetail,
  findUserSongListHobby,
  subSongList
} from '@/api/songdetail'
import type lMusic from '@/library/l-music/l-music'
import { findMusicDetail, findMusicURL } from '@/api/music'
import { useMusic } from '@/stores/music'
import { useUser } from '@/stores/user'
import {
  playCountFormat,
  timeFormat,
  playSongTime,
  useOperateSendComment,
  useOperateCommentLike,
  useOperateReply,
  useOperateLikeMusic,
  isLoginStatus
} from '@/hooks'
import LComment from '@/components/l-comment/l-comment'
import Subscribers from './components/subscribers'
import Toast from '@/plugins/Toast'
import './style'
const SongListDetail = defineComponent({
  name: 'SongListDetail',
  setup(props, { emit }) {
    const UStore = useUser()
    const MStore = useMusic()
    const LMusic = ref<InstanceType<typeof lMusic>>()
    const route = useRoute()
    const href = ref('javascript:;')
    // 爱好者数据
    const subscribers = ref([])
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
    const reqHobbyContainer = reactive({
      limit: 40,
      offset: 0,
      total: 0
    })
    // 所有音乐
    const music = ref()
    // 活跃Tabs
    const activeName = ref('song')
    // 获取评论
    const getSongComment = async () => {
      const comment: any = await findSongListComment({
        id: route.params.id as any,
        ...reqCommentParams
      })
      CommentContainer.comments = comment.comments
      CommentContainer.hotComments = comment.hotComments
      reqCommentParams.total = comment.total
    }
    // 获取爱好
    const getHobby = async () => {
      const hobby: any = await findUserSongListHobby({
        id: route.params.id as any,
        ...reqHobbyContainer
      })
      subscribers.value = hobby.subscribers
      reqHobbyContainer.total = hobby.total
    }
    // 检测
    watch(
      () => reqCommentParams,
      () => {
        getSongComment()
      },
      { deep: true }
    )
    // 获取歌单详情
    const getSongDetail = async (id: number) => {
      const res = await findSongDetail(id)
      detail.value = res!.playlist
      const resMusic = await findMusicDetail(
        detail.value.trackIds.map(item => item.id)
      )
      music.value = resMusic!.songs
    }
    getSongComment()
    getHobby()
    getSongDetail(route.params.id as any)
    const playMusic = (id: number) => {
      MStore.playMusic([id])
    }
    const playAll = () => {
      const arr = []
      MStore.$reset()
      LMusic.value?.pause()
      if (detail.value.trackIds.length > 50) {
        for (let index = 0; index < 80; index++) {
          arr.push(detail.value.trackIds[index])
        }
        MStore.playMusic([arr], 1)
      } else {
        MStore.playMusic(
          detail.value.trackIds.map(item => item.id),
          1
        )
      }
    }
    // 评论点赞

    const operateCommentLike = (item: any) => {
      useOperateCommentLike(2, item, detail.value.id, getSongComment)
    }

    // 发表评论
    const operateSendComment = async (value: string) => {
      useOperateSendComment(2, detail.value.id, value, getSongComment)
    }
    // 回复评论
    const operateReply_ = (item: any, content: string) => {
      useOperateReply(2, item, detail.value.id, content, getSongComment)
    }
    // 评论
    const PaginationSizeChange = (item: any) => {
      reqCommentParams.limit = item.limit
      reqCommentParams.offset = 0
      getSongComment()
    }
    const PaginationCurrentChange = (item: any) => {
      reqCommentParams.offset = item.limit * (item.page - 1)
      getSongComment()
    }
    // 爱好
    const PaginationHobbySizeChange = (item: any) => {
      reqHobbyContainer.limit = item.limit
      reqHobbyContainer.offset = 0
      getHobby()
    }
    const PaginationHobbyCurrentChange = (item: any) => {
      reqHobbyContainer.offset = item.limit * (item.page - 1)
      getHobby()
    }
    // 收藏歌单
    const songSub = async () => {
      if (UStore?.profile.code === 200) {
        const t = detail.value.subscribed === true ? 0 : 1
        const res = await subSongList(detail.value.id, t)
        if (res.code === -462) {
          return Toast('warning', '收藏失败, 需要官方的' + res.data.blockText)
        }
        console.log('收藏切换', t)
        if (t === 0) {
          Toast('success', `已为您取消了 ${detail.value.name} 的收藏`)
        } else {
          Toast('success', `已为您收藏了 ${detail.value.name} `)
        }
        console.log(res)
        getSongDetail(route.params.id as any)
      } else {
        Toast('warning', '亲, 请先登录再操作噢')
      }
    }
    // 点击喜欢操作
    const likeMusic = id => {
      const isLogin = isLoginStatus()
      if (isLogin.value) {
        useOperateLikeMusic(id, UStore.profile.profile.userId).then(() => {
          getSongDetail(route.params.id as any)
        })
      } else {
        Toast('warning', '亲 请先登录,再操作')
      }
    }
    // 判断是否是喜欢的音乐
    const testActive = id => {
      const res = UStore.likeList.findIndex(ids => ids === id)
      if (res !== -1) {
        return true
      }
    }
    const downMusic = async id => {
      const res = await findMusicURL(id)
      window.location.href = res.data[0].url
    }
    return {
      detail,
      music,
      activeName,
      CommentContainer,
      reqCommentParams,
      PaginationSizeChange,
      PaginationCurrentChange,
      PaginationHobbySizeChange,
      PaginationHobbyCurrentChange,
      playMusic,
      playAll,
      operateCommentLike,
      operateSendComment,
      operateReply_,
      subscribers,
      reqHobbyContainer,
      songSub,
      likeMusic,
      testActive,
      href,
      downMusic
    }
  },
  render() {
    return (
      <div class={`card`}>
        <div class="songlist-detail-header">
          <div class="songlist-detail-header-left">
            <img v-lazy={this.detail?.coverImgUrl} alt="" />
          </div>
          <div class="songlist-detail-header-right">
            <h1 class={`songTitle`}>{this.detail?.name}</h1>
            {/* 用户信息 */}
            <div class={`user-info`}>
              <span
                onClick={() =>
                  this.$router.push(
                    `/user/${this.detail?.creator.userId}/detail`
                  )
                }
                style={`cursor: pointer;`}
              >
                <img v-lazy={this.detail?.creator.avatarUrl} alt="" />
                <img
                  class={`songlist-info-img`}
                  v-lazy={this.detail?.creator.avatarDetail?.identityIconUrl}
                  alt=""
                />

                <span class={`active`}>{this.detail?.creator.nickname}</span>
              </span>
              <span>{timeFormat(this.detail?.createTime)} 创建 </span>
            </div>
            {/* 操作 */}
            <div class="operate">
              <el-button onClick={() => this.playAll()} type="danger">
                <i class={`iconfont l-24gl-play`}></i>
                播放全部
              </el-button>

              <el-button
                onClick={() => this.songSub()}
                type={`${this.detail?.subscribed ? 'danger' : ''}`}
                style={`text-center: center;`}
              >
                <i
                  class={`${
                    this.detail?.subscribed ? 'active' : ''
                  } iconfont l-shoucang`}
                ></i>
                {this.detail?.subscribed ? '已收藏' : '收藏'}{' '}
                {playCountFormat(this.detail?.subscribedCount)}
              </el-button>
            </div>
            {/* 内容 */}
            <section class={`secondaryExpertIdentiy`}>
              <span>标签: </span>
              {this.detail?.tags?.map((item, index) => {
                return (
                  <>
                    <span
                      style={`cursor: pointer;`}
                      onClick={() => this.$router.push(`/songlist/${item}`)}
                      class={`active`}
                    >
                      {item}
                    </span>
                    {index < this.detail.tags.length - 1 ? <span>/</span> : ''}
                  </>
                )
              })}
            </section>
            {/* 歌曲信息 */}
            <div class={`info`}>
              <span style={`margin-left: 0`}>歌曲: </span>{' '}
              <i> {this.detail?.trackCount} </i>
              <span>播放: </span>{' '}
              <i> {playCountFormat(this.detail?.playCount)} </i>
            </div>
            {/* 简介 */}
            <el-popover placement="bottom-start" width={1100} trigger="hover">
              {{
                reference: () => <el-button>简介</el-button>,
                default: () => {
                  return (
                    <pre class={`songlistpre`}>{this.detail?.description}</pre>
                  )
                }
              }}
            </el-popover>
          </div>
        </div>
        <div class={`songlist-body`}>
          <el-tabs v-model={this.activeName}>
            <el-tab-pane label="歌曲列表" name="song">
              <el-button
                onClick={() => {
                  this.music.reverse()
                }}
              >
                换排序
              </el-button>
              <el-table
                highlight-current-row
                onRow-dblclick={e => {
                  this.playMusic(e.id)
                }}
                data={this.music}
                stripe
              >
                <el-table-column align="center" type="index" width="50" />
                <el-table-column
                  align="center"
                  width="80"
                  v-slots={{
                    default: scope => {
                      return (
                        <>
                          {this.testActive(scope.row.id) ? (
                            <span
                              key={new Date() + ''}
                              onClick={withModifiers(
                                () => this.likeMusic(scope.row.id),
                                ['stop', 'prevent']
                              )}
                              title="取消喜欢"
                              class={`iconfont active newsong-shoucang l-shoucang`}
                            ></span>
                          ) : (
                            <span
                              onClick={withModifiers(
                                () => this.likeMusic(scope.row.id),
                                ['stop', 'prevent']
                              )}
                              key={new Date() + ''}
                              title="喜欢"
                              class={`iconfont newsong-shoucang l-shoucang`}
                            ></span>
                          )}
                          <a
                            href={this.href}
                            onClick={withModifiers(
                              () => this.downMusic(scope.row.id),
                              ['stop', 'prevent']
                            )}
                            class={`music-down`}
                            style={`margin-left:10px;`}
                          >
                            下载
                          </a>
                        </>
                      )
                    }
                  }}
                  label="操作"
                />
                {/*  */}
                <el-table-column prop="name" label="标题" />
                <el-table-column
                  align="center"
                  width="200"
                  prop=""
                  v-slots={{
                    default: scope => {
                      return (
                        <span
                          style={`cursor: pointer;`}
                          onClick={() =>
                            this.$router.push(
                              `/singerdetail/${scope.row.ar[0].id}`
                            )
                          }
                        >
                          {scope.row.ar[0].name}
                        </span>
                      )
                    }
                  }}
                  label="歌手"
                />
                <el-table-column
                  align="center"
                  v-slots={{
                    default: scope => {
                      return (
                        <span
                          style={`cursor: pointer;`}
                          onClick={() =>
                            this.$router.push(
                              `/album/${scope.row.al.id}/detail`
                            )
                          }
                        >
                          {scope.row.al.name}
                        </span>
                      )
                    }
                  }}
                  label="专辑"
                />
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
            <el-tab-pane label="收藏者" name="favorite">
              <Subscribers
                subscribers={this.subscribers}
                total={this.reqHobbyContainer.total}
                onPaginationHobbyCurrentChange={
                  this.PaginationHobbyCurrentChange
                }
                onPaginationHobbySizeChange={this.PaginationHobbySizeChange}
              ></Subscribers>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    )
  }
})

export default SongListDetail
