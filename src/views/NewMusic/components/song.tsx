import { defineComponent, ref, withModifiers } from 'vue'
import { useMusic } from '@/stores/music'
import { useUser } from '@/stores/user'
import { findNewSong } from '@/api/newsong'
import { playSongTime, isLoginStatus, useOperateLikeMusic } from '@/hooks'
import { songArrType } from './config'
import Toast from '@/plugins/Toast'
const NewSong = defineComponent({
  name: 'NewSong',
  setup(props, { emit }) {
    const MStore = useMusic()
    const UStore = useUser()
    const currentType = ref(0)
    const musicList = ref([])
    const getNewSong = async (Type: number) => {
      currentType.value = Type
      const { data } = await findNewSong(Type)
      musicList.value = data
    }
    getNewSong(currentType.value)
    const playMusic = item => {
      console.log(item, item.id)
      MStore.playMusic(item.id)
    }
    const likeMusic = id => {
      const isLogin = isLoginStatus()
      if (isLogin.value) {
        useOperateLikeMusic(id, UStore.profile.profile.userId).then(() => {
          getNewSong(currentType.value)
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
      musicList,
      songArrType,
      currentType,
      getNewSong,
      playMusic,
      testActive,
      likeMusic
    }
  },
  render() {
    return (
      <>
        <div style={`font-size: 16px; margin: 20px; 10px;`}>
          {this.songArrType.map(item => {
            return (
              <span
                style={`margin: 20px; cursor: pointer;`}
                class={`${
                  this.currentType === item.type ? 'songTypeActive' : ''
                }`}
                onClick={() => {
                  this.getNewSong(item.type)
                }}
              >
                {item.name}
              </span>
            )
          })}
        </div>
        <el-table show-header={false} data={this.musicList}>
          <el-table-column align="center" label="#" type="index" width="60" />
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
          {/* tsx写法 slots */}
          {
            <el-table-column
              align="center"
              width="150"
              v-slots={{
                default: (scope: any) => {
                  return (
                    <>
                      <img
                        style={`width: 80px; height: 80px; border-radius: 10px; `}
                        v-lazy={scope.row.album.picUrl}
                        alt=""
                      />
                      <i
                        onClick={() => {
                          this.playMusic(scope.row)
                        }}
                        class={`iconfont playnew l-24gf-playCircle`}
                      ></i>
                    </>
                  )
                }
              }}
            ></el-table-column>
          }
          <el-table-column
            align="left"
            prop="name"
            width="180"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="album.artists[0].name"
          ></el-table-column>
          <el-table-column align="center" prop="album.name"></el-table-column>
          <el-table-column
            align="center"
            v-slots={{
              default: scope => {
                return <>{playSongTime(scope.row.duration)}</>
              }
            }}
          ></el-table-column>
        </el-table>
      </>
    )
  }
})

export default NewSong
