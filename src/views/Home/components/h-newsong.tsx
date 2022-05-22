import { defineComponent } from 'vue'
import LMore from '@/components/l-more/l-more'
import { findNewSong } from '@/api/home'
import { useMusic } from '@/stores/music'
import { playSongTime } from '@/hooks'
import './style/h-newsong'
const HNewSong = defineComponent({
  name: 'HNewSong',
  components: {
    LMore
  },
  async setup(props, { emit }) {
    // 新音乐
    const MStore = useMusic()
    const { result } = await findNewSong()
    const arr = result.map(item => item.id)
    // 播放音乐
    const playMusic = (item: any) => {
      MStore.playMusic(item.id)
      console.log('play')
    }
    return {
      result,
      playMusic
    }
  },
  render() {
    return (
      <div class={`newsong-container container`}>
        <LMore title="新音乐" to="/"></LMore>
        {this.result.map(item => {
          return (
            <div class="newsong-container-item" onClick={() => this.playMusic(item)}>
              <img v-lazy={item.picUrl} alt="" />
              <span class={`songname`}>{item.name}</span>
              <span class={`singername`}>
                {item.song.album.artists[0].name}
              </span>
              <span class={`songtime`}>{playSongTime(item.song.duration)}</span>
              <i class={`iconfont newsong-bofang l-24gf-playCircle`}></i>
              <i class={`iconfont newsong-shoucang l-shoucang`}></i>
            </div>
          )
        })}
      </div>
    )
  }
})

export default HNewSong
