import { defineComponent, withModifiers } from 'vue'
import { playSongTime, isLoginStatus, useOperateLikeMusic } from '@/hooks'
import { useMusic } from '@/stores/music'
import { useUser } from '@/stores/user'
import Toast from '@/plugins/Toast'
const SearchSongs = defineComponent({
  props: {
    search: {
      type: Array,
      default: () => []
    }
  },
  name: 'SearchSongs',
  emits: ['updateSearch'],
  setup(props, { emit }) {
    const UStore = useUser()
    const MStore = useMusic()
    const playMusic = (id: number) => {
      MStore.playMusic([id])
    }
    const likeMusic = id => {
      const isLogin = isLoginStatus()
      if (isLogin.value) {
        useOperateLikeMusic(id, UStore.profile.profile.userId).then(() => {
          emit('updateSearch')
        })
      } else {
        Toast('warning', '亲 请先登录,再操作')
      }
    }

    const testActive = id => {
      const res = UStore.likeList.findIndex(ids => ids === id)
      if (res !== -1) {
        return true
      }
    }
    return {
      playMusic,
      playSongTime,
      likeMusic,
      testActive
    }
  },
  render() {
    return (
      <el-table
        highlight-current-row
        stripe
        onRow-dblclick={e => {
          this.playMusic(e.id)
        }}
        data={this.search}
        border
      >
        <el-table-column type="index" width="50" align="center" />

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
                </>
              )
            }
          }}
          label="操作"
        />

        <el-table-column prop="name" label="歌名" align="center" />
        <el-table-column
          v-slots={{
            default: scope => {
              return (
                <>
                  {scope.row.artists.map((item, index) => {
                    return (
                      <>
                        <span
                          style={`cursor: pointer;`}
                          onClick={() =>
                            this.$router.push(`/singerdetail/${item.id}`)
                          }
                        >
                          {item.name}
                        </span>
                        {index < scope.row.artists.length - 1 ? (
                          <span>/</span>
                        ) : (
                          ''
                        )}
                      </>
                    )
                  })}
                </>
              )
            }
          }}
          align="center"
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
                    this.$router.push(`/album/${scope.row.album.id}/detail`)
                  }
                >
                  {scope.row?.album.name}
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
              return <>{playSongTime(scope.row.duration)}</>
            }
          }}
          label="时长"
        />
      </el-table>
    )
  }
})

export default SearchSongs
