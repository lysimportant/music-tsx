import { defineComponent, ref, onMounted } from 'vue'
import { playSongTime } from '@/hooks/index'
import './style'
export default defineComponent({
  name: "LMusic",
  props: {
    audio: {
      type: Array,
      default: () => ([])
    }
  },
  setup (props) {
    const show = ref(false)
    const currentIndex = ref(0)
    const playing = ref(false)
    const audioRef = ref()
    const play = () => {
      playing.value = true
      audioRef.value.play()
    }
    const pause = () => {
      playing.value = false
      audioRef.value.pause()
    }
    const next =() => {
      pause()
      currentIndex.value+=1
      if(currentIndex.value > props.audio.length -1) {
        currentIndex.value = 0
      }
      setTimeout(() => {
        play()
      }, 0);
    }
    const toggle = () => {
      if (playing.value) {
        playing.value = false
        pause()
      } else {
        playing.value = true
        play()
      }
    }
    const back =() => {
      pause()
      currentIndex.value-=1
      if(currentIndex.value < 0) {
        currentIndex.value = props.audio.length -1
      }
      setTimeout(() => {
        play()
      }, 0);
    }
    return {
      show,
      currentIndex,
      audioRef,
      playing,
      play,
      pause,
      next,
      back,
      toggle
    }
  },
  render () {
    return <>
      <div class="l-music-container">
        {/* {this.show ? <i onClick={() => this.show = false} class={`iconfont music-arrow-left l-31fanhui1`}></i>:
                <i onClick={() => this.show = true} class={`iconfont music-arrow-right l-31fanhui2`}></i> } */}
        <i onClick={() => this.show = !this.show} class={`${this.show ? 'music-deg': ''} iconfont music-arrow-left l-31fanhui1`}></i>


        <div style={`${this.show ?' display: none' : ""}`} class={`l-music-container-left`}>
         <img onClick={() => this.toggle()} class={`${this.playing ? 'music_play': ''}`} src={this.audio[this.currentIndex]?.picUrl} alt="" />
        </div>
        <div style={`${this.show ?' display: none' : ""}`} class={`l-music-container-center`}>
          <div class={`music-info`}>
            <span class={`songName`}>{this.audio[this.currentIndex]?.songName}</span>
            <span class={`singerName`}>-- {this.audio[this.currentIndex]?.singerName}</span>
          </div>
          <div class={`music-progress`}>
            <span class="end-progress">
              <span class="current-progress"></span>
            </span>
          </div>
          <div class={`play-all-time`}>
            <span>{`00:00`}</span> /
            <span> {playSongTime(this.audio[this.currentIndex]?.duration)}</span>
          </div>

          <audio ref={`audioRef`} src={this.audio[this.currentIndex]?.url}>
              <source src="horse.ogg" type="audio/ogg"/>
              <source src="horse.mp3" type="audio/mpeg"/>
              您的浏览器不支持 audio 元素。
          </audio>
        </div>
        <div style={`${this.show ?' display: none' : ""}`} class={`l-music-container-right`}>
          <span onClick={() => {this.back()}} class={`music-back`}></span>
          { this.playing ?
          <span onClick={() => { this.pause()}}
           class={`music-pause`}></span>:
           <span
           onClick={() => {this.play()}}
           class={`music-start`}></span>}
          <span onClick={() => {this.next()}} class={`music-forward`}></span>
        </div>
      </div>
    </>
  }
})
