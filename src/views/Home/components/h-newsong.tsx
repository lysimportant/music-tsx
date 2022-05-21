import { defineComponent } from 'vue'
import LMore from '@/components/l-more/l-more'
import { findNewSong } from '@/api/home'
import { playSongTime } from '@/hooks'
import "./style/h-newsong"
const HNewSong = defineComponent({
  name: "HNewSong",
  components: {
    LMore
  },
  async setup (props, { emit }) {
    const { result } = await findNewSong()
    console.log(result, 'result')
    return {
      result
    }
  },
  render () {
    return <div class={`newsong-container container`}>
        <LMore title='新音乐' to='/'></LMore>
        {this.result.map(item => {
          return <div class="newsong-container-item">
            <img src={item.picUrl} alt="" />
            <span class={`songname`}>{item.name}</span>
            <span class={`singername`}>{item.song.album.artists[0].name}</span>
            <span class={`songtime`}>{playSongTime(item.song.duration)}</span>
            <i class={`iconfont newsong-bofang l-24gf-playCircle`}></i>
          </div>
        })}
    </div>

  }
})

export default HNewSong
