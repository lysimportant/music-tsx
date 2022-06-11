import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  findArtistTopSong,
  findArtistAlbum,
  findAlbumDetail
} from '@/api/singer'
import { playSongTime } from '@/hooks'
import { useMusic } from '@/stores/music'
import '../style/singer-detail-album'
import router from '@/router'
const SingerDetailAlbum = defineComponent({
  name: 'SingerDetailAlbum',
  setup(props, { emit }) {
    const MStore = useMusic()
    const songs = ref([])
    const album: any = ref([])
    const route = useRoute()

    // 音乐播放
    const playMusic = (id: number) => {
      MStore.playMusic([id])
    }
    watch(
      () => route.params.id,
      async () => {
        console.log('请求数据')
        album.value = []
        // 获取歌手前50热门歌曲
        findArtistTopSong(route.params.id as string).then(res => {
          songs.value = res.songs
        })
        // 获取歌手专辑
        findArtistAlbum(route.params.id as string).then(res => {
          res.hotAlbums.forEach(item => {
            findAlbumDetail(item.id).then(res => {
              album.value.push(res)
            })
          })
        })
      },
      { immediate: true }
    )
    return {
      songs,
      album,
      playMusic
    }
  },
  render() {
    return (
      <>
        {/* top 50 */}
        <div class={`singer-top-50`}>
          <h1>Top50首</h1>
          <el-table
            data={this.songs}
            stripe
            show-header={false}
            height={350}
            onRowClick={e => {
              this.playMusic(e.id)
            }}
          >
            <el-table-column align="center" type="index" width={50} />
            <el-table-column align="left" prop="name" />
            {/* dt */}
            <el-table-column
              v-slots={{
                default: scope => {
                  return <span>{playSongTime(scope.row.dt)}</span>
                }
              }}
              align="right"
            ></el-table-column>
          </el-table>
        </div>
        {/* 专辑 */}
        {this.album.map(item => {
          return (
            <div class="singer-detail-album">
              <div
                class="singer-detail-album-left"
                onClick={() =>
                  this.$router.push(`/album/${item.album.id}/detail`)
                }
              >
                <img
                  onClick={() => console.log(item)}
                  v-lazy={item?.album.picUrl}
                  alt=""
                />
              </div>
              <div class="singer-detail-album-right">
                <div class="singer-detail-album-right-top">
                  <h1 style={`display: inline-block`}>{item?.album.name}</h1>

                  <el-popover
                    placement="bottom-start"
                    width={1000}
                    trigger="hover"
                    content="this is content, this is content, this is content"
                  >
                    {{
                      reference: () => {
                        return <el-button>简介</el-button>
                      },
                      default: () => {
                        return <>{item.album.description ?? '数据加载中'}</>
                      }
                    }}
                  </el-popover>
                </div>
                <el-table
                  data={item.songs}
                  stripe
                  show-header={false}
                  height={350}
                  onRowClick={e => {
                    this.playMusic(e.id)
                  }}
                >
                  <el-table-column align="center" type="index" width={50} />
                  <el-table-column align="left" prop="name" />
                  {/* dt */}
                  <el-table-column
                    v-slots={{
                      default: scope => {
                        return <span>{playSongTime(scope.row.dt)}</span>
                      }
                    }}
                    align="right"
                  ></el-table-column>
                </el-table>
              </div>
            </div>
          )
        })}
      </>
    )
  }
})

export default SingerDetailAlbum
