import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { findDJDetail, findDJProgram } from '@/api/dj'
import type lMusic from '@/library/l-music/l-music'
import { useMusic } from '@/stores/music'
import { playCountFormat, timeFormat, playSongTime } from '@/hooks'
import './style'
const SongListDetail = defineComponent({
  name: 'SongListDetail',
  setup(props, { emit }) {
    const MStore = useMusic()
    const LMusic = ref<InstanceType<typeof lMusic>>()
    const route = useRoute()
    // 电台详情
    const detail = ref()
    // 所有音乐
    const music = ref()
    const musicTotal = ref(10)
    // 活跃Tabs
    const activeName = ref('song')
    // 获取歌单详情
    const getDJDetail = async (id: string) => {
      console.log(id)
      const res = await findDJDetail(id)
      const program = await findDJProgram(id)
      musicTotal.value = program.count
      detail.value = res.data
      music.value = program.programs
    }
    getDJDetail(route.params.id as any)
    const playMusic = (id: number) => {
      MStore.playMusic([id])
    }
    // 播放全部
    const playAll = () => {
      MStore.isPlay = false
      LMusic.value?.pause()
      MStore.playMusic(
        detail.value.songs.map(item => item.mainSong.id),
        1
      )
    }

    return {
      detail,
      music,
      activeName,
      musicTotal,
      playAll,
      playMusic
    }
  },
  render() {
    return (
      <div class={`card`}>
        <div class="songlist-detail-header">
          {/* 左边 */}
          <div class="songlist-detail-header-left">
            <img v-lazy={this.detail?.picUrl} alt="" />
          </div>
          {/* 右边 */}
          <div class="songlist-detail-header-right">
            <h1 class={`DJTitle`}>{this.detail?.name}</h1>
            <div class={`user-info`}>
              <span
                onClick={() =>
                  this.$router.push(`/user/${this.detail?.dj.userId}/detail`)
                }
                style={`cursor: pointer;`}
              >
                <img v-lazy={this.detail?.dj.avatarUrl} alt="" />
              </span>
              <span class={`active`}>{this.detail?.dj.nickname}</span>
            </div>

            {/* 操作 */}
            <div class="operate">
              <el-button onClick={() => this.playAll()} type="danger">
                <i class={`iconfont l-24gl-play`}></i>
                播放全部
              </el-button>

              <el-button style={`text-center: center;`}>
                <i
                  class={`${
                    this.detail?.subed ? 'active' : ''
                  } iconfont l-shoucang`}
                ></i>
                {this.detail?.subed ? '已收藏' : '收藏'}{' '}
                {playCountFormat(this.detail?.subCount)}
              </el-button>
            </div>
            <div class={`yc`}>
              <span>{this.detail?.category}</span>
              <i>{this.detail?.desc}</i>
            </div>
          </div>
        </div>
        <div class={`songlist-body`}>
          <el-tabs v-model={this.activeName}>
            <el-tab-pane label={`声音 ${this.musicTotal}`} name="song">
              <el-button
                onClick={() => {
                  this.music.reverse()
                }}
              >
                换排序
              </el-button>
              <el-table
                show-header={false}
                onRowClick={e => {
                  this.playMusic(e.mainSong.id)
                  console.log(e)
                }}
                data={this.music}
              >
                <el-table-column align="center" type="index" width="50" />
                <el-table-column
                  align="center"
                  width="150"
                  v-slots={{
                    default: scope => {
                      return (
                        <>
                          <img
                            style={`width: 150px; height: 100px;`}
                            src={scope.row.coverUrl}
                            alt=""
                          />
                        </>
                      )
                    }
                  }}
                />
                <el-table-column prop="name" />
                <el-table-column
                  align="center"
                  width="200"
                  prop="listenerCount"
                />
                <el-table-column
                  align="center"
                  v-slots={{
                    default: scope => {
                      return (
                        <span>
                          <i class={` l-dianzan  iconfont`}> </i>{' '}
                          {scope.row.likedCount}
                        </span>
                      )
                    }
                  }}
                />
                <el-table-column
                  align="center"
                  width="180"
                  v-slots={{
                    default: scope => {
                      return <>{timeFormat(scope.row.createTime)}</>
                    }
                  }}
                />
                <el-table-column
                  align="center"
                  width="180"
                  v-slots={{
                    default: scope => {
                      return <>{playSongTime(scope.row.mainSong.duration)}</>
                    }
                  }}
                  label="时长"
                />
              </el-table>
            </el-tab-pane>
            <el-tab-pane label={`收藏者`} name="comment"></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    )
  }
})

export default SongListDetail
