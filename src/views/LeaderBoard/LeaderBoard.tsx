import { defineComponent, ref, withModifiers } from 'vue'
import { findLeaderBoardDetail } from '@/api/leaderboard'
import { findSongDetail } from '@/api/songDetail'
import { findMusicDetail } from '@/api/music'
import LRecommend from '@/components/l-recommend/l-recommend'
import { useMusic } from '@/stores/music'
import './style'
const LeaderBoard = defineComponent({
  name: 'LeaderBoard',
  setup(props, { emit }) {
    const MStore = useMusic()
    const officialLeaderBoardList = ref([])
    // 全球榜
    const globalLeaderBoardList = ref([])
    // 获取要展示五个歌单的前五个
    const exhibitList = ref([])
    // 五个歌单id的集合
    const songId = ref([])
    const songDetail = ref([])
    findLeaderBoardDetail().then(res => {
      officialLeaderBoardList.value = res.list.splice(0, 4)
      globalLeaderBoardList.value = res.list
      // 官方榜
      officialLeaderBoardList.value.forEach(async item => {
        // 获取歌单详情
        const data = await findSongDetail(item.id)
        // 分割歌单ID的集合
        exhibitList.value.push(data.privileges.slice(0, 5))
        if (exhibitList.value.length === 4) {
          // 遍历ID
          exhibitList.value.forEach((item, index) => {
            item.forEach(async element => {
              songId.value.push(element.id)
              if (songId.value.length === 20) {
                // 歌曲详情
                const data = await findMusicDetail(songId.value)
                // 分割
                for (let i = 0; i < 5; i++) {
                  songDetail.value.push(data.songs.splice(0, 5))
                }
                console.log(songDetail.value)
              }
            })
          })
        }
      })
    })
    const playMusic = item => {
      if (item.al.id) {
        MStore.playMusic(item.id)
        console.log(item.al.id, item)
      } else {
        MStore.playMusic(item.originSongSimpleData.songId)
        console.log(item, item.originSongSimpleData.songId)
      }
    }
    return {
      officialLeaderBoardList,
      globalLeaderBoardList,
      songId,
      songDetail,
      playMusic
    }
  },
  render() {
    return (
      <div class={`card`}>
        <h1>官方榜</h1>
        {this.officialLeaderBoardList.map((item, index) => {
          return (
            <div class="official-container">
              <div class={`left`}>
                <img src={item?.coverImgUrl} alt="" />
                <i class={`iconfont bf l-24gf-playCircle`}></i>
              </div>
              <div class={`right`}>
                <ul>
                  {this.songDetail[index]?.map((item, index) => {
                    return (
                      <li
                        onClick={() => {
                          this.playMusic(item)
                        }}
                      >
                        <i>{index + 1}</i>
                        <span style={`margin: 0 20px; width: 100%;`}>
                          {item.name}
                        </span>
                        <span class="left ellipsis">
                          {item.ar.map((ar, index) => {
                            return (
                              <span
                                onClick={withModifiers(() => {
                                  console.log(ar)
                                }, ['stop'])}
                              >
                                {ar.name}
                                {index < item.ar.length - 1 ? ' / ' : ''}
                              </span>
                            )
                          })}
                        </span>
                      </li>
                    )
                  })}
                  <li>
                    <i class={`jump-song-detail`} style={`font-size: 16px`}>
                      查看全部{`>`}{' '}
                    </i>
                  </li>
                </ul>
              </div>
            </div>
          )
        })}
        <h1>全球榜</h1>
        <LRecommend list={this.globalLeaderBoardList}></LRecommend>
      </div>
    )
  }
})

export default LeaderBoard
