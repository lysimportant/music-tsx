import { defineComponent, ref } from 'vue'
import { useMusic } from '@/stores/music'
import { findNewSong } from '@/api/newsong'
import { playSongTime } from '@/hooks'
import { songArrType } from './config'
const NewSong = defineComponent({
  name: 'NewSong',
  setup(props, { emit }) {
    const MStore = useMusic()
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

    return {
      musicList,
      songArrType,
      currentType,
      getNewSong,
      playMusic
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
                        src={scope.row.album.picUrl}
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
