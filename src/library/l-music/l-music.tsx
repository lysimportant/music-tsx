import { defineComponent, ref, watch, onMounted } from 'vue'
import { playSongTime } from '@/hooks/index'
import { useMusic } from '@/stores/music'
import dayjs from 'dayjs'
import './style'
export default defineComponent({
  name: 'LMusic',
  props: {
    audio: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    // 是否播放
    const store = useMusic()
    const show = ref(false)
    const showList = ref(false)
    // 当前歌曲
    const currentIndex = ref(0)
    // 播放中 ?
    const playing = ref(false)
    // audio元素
    const audioRef = ref()
    // 音量
    const volume = ref(50)
    // 显示
    const showVolume = ref(false)
    // 进度
    const progress = ref(0)
    // 总时长
    const endTime = ref(0)
    // 开启播放
    const play = () => {
      if (props.audio.length > 0) {
        playing.value = true
        audioRef.value.play()
        store.isPlay = true
      }
    }
    onMounted(() => {
      audioRef.value.volume = volume.value / 100
      console.log(audioRef.value.volume)
    })
    watch(
      () => props.audio,
      () => {
        if (!playing.value) {
          setTimeout(() => {
            play()
          }, 1)
        }
      }
    )

    const pause = () => {
      playing.value = false
      audioRef.value.pause()
      store.isPlay = false
    }
    const next = () => {
      pause()
      currentIndex.value += 1
      if (currentIndex.value > props.audio.length - 1) {
        currentIndex.value = 0
      }
      setTimeout(() => {
        play()
      }, 0)
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
    const back = () => {
      pause()
      currentIndex.value -= 1
      if (currentIndex.value < 0 || props.audio.length > 0) {
        currentIndex.value = props.audio.length - 1
        if (currentIndex.value < 0) {
          currentIndex.value = 0
        }
      }
      setTimeout(() => {
        play()
      }, 0)
    }
    const volumeInput = (val: number) => {
      audioRef.value && (audioRef.value.volume = val / 100)
      console.log(val)
    }
    const updateTime = val => {
      if (playing) {
        audioRef.value.duration //获取总播放时间
        audioRef.value.currentTime //获取播放进度
        endTime.value = audioRef.value.duration
        progress.value = parseInt(audioRef.value.currentTime)
        // if(currentIndex.value === props.audio.length - 1) return
        if (parseInt(endTime.value + '') === progress.value) {
          next()
          console.log('下一首')
        }
      }
    }
    const changeProgress = val => {
      if (playing) {
        audioRef.value.currentTime = progress.value
        play()
      }
    }
    function getTime(time: number) {
      // 转换为式分秒
      let m: any = parseInt((time / 60) % 60)
      m = m < 10 ? '0' + m : m
      let s: any = parseInt(time % 60)
      s = s < 10 ? '0' + s : s
      // 作为返回值返回
      return m + ':' + s
    }
    return {
      show,
      showList,
      currentIndex,
      audioRef,
      playing,
      volume,
      progress,
      endTime,
      showVolume,
      play,
      pause,
      next,
      back,
      toggle,
      volumeInput,
      updateTime,
      changeProgress,
      getTime
    }
  },
  render() {
    return (
      <>
        <div class="l-music-container">
          {/* 显示隐藏 */}
          <i
            title="显示/隐藏控件"
            onClick={() => (this.show = !this.show)}
            class={`${
              this.show ? 'music-deg' : ''
            } iconfont music-arrow-left l-31fanhui1`}
          ></i>
          {this.audio.length > 0 ? (
            <i
              title="显示/隐藏列表"
              onClick={() => (this.showList = !this.showList)}
              class={`${
                this.showList ? 'music-list-close-deg' : 'music-list-open-deg'
              } iconfont music-arrow-left l-31fanhui1`}
            ></i>
          ) : (
            ''
          )}
          {/* 左边图片 */}
          <div
            style={`${this.show ? ' display: none' : ''}`}
            class={`l-music-container-left`}
          >
            {this.audio.length > 0 ? (
              <img
                onClick={() => {
                  console.log(this.audio[this.currentIndex])
                }}
                class={`${this.playing ? 'music_play' : ''}`}
                src={this.audio[this.currentIndex]?.picUrl}
                alt=""
              />
            ) : (
              ''
            )}
          </div>
          {/* 进度区 */}
          <div
            style={`${this.show ? ' display: none' : ''}`}
            class={`l-music-container-center`}
          >
            {/* 信息 */}
            <div class={`music-info`}>
              <span class={`songName`}>
                {this.audio[this.currentIndex]?.songName}
              </span>
              <span class={`singerName`}>
                -- {this.audio[this.currentIndex]?.singerName}
              </span>
            </div>
            {/* 进度条 */}
            <el-slider
              show-tooltip={false}
              onInput={val => {
                this.changeProgress(val)
              }}
              v-model={this.progress}
              max={this.endTime}
            ></el-slider>
            <div class={`play-all-time`}>
              {/* <span>{playSongTime(this.progress)}</span> */}
              <span>
                {this.progress > 0 ? this.getTime(this.progress) : '00:00'} /{' '}
              </span>
              <span>
                {' '}
                {this.audio[this.currentIndex]?.duration > 0
                  ? playSongTime(this.audio[this.currentIndex]?.duration)
                  : '00:00'}
              </span>
            </div>
            <audio
              onTimeupdate={val => {
                this.updateTime(val)
              }}
              ref={`audioRef`}
              src={this.audio[this.currentIndex]?.url}
            ></audio>
          </div>
          {/* 功能区 */}
          <div
            onMouseleave={() => {
              this.showVolume = false
            }}
            style={`${this.show ? ' display: none' : ''}`}
            class={`l-music-container-right`}
          >
            <div class="box" v-show={this.showVolume}>
              <el-slider
                onInput={val => {
                  this.volumeInput(val)
                }}
                v-model={this.volume}
                vertical
                height="160px"
              ></el-slider>
            </div>
            <i
              onMouseenter={() => {
                this.showVolume = true
              }}
              class={`iconfont music-volume  ${
                this.volume > 0
                  ? this.volume > 60
                    ? 'l-24gl-volumeHigh'
                    : 'l-24gl-volumeLow'
                  : 'l-24gl-volumeCross'
              }`}
            ></i>

            <i
              onMouseenter={() => {
                this.showVolume = false
              }}
              onClick={() => {
                this.back()
              }}
              class={`music-back`}
            ></i>
            {this.playing ? (
              <i
                onClick={() => {
                  this.pause()
                }}
                class={`music-pause`}
              ></i>
            ) : (
              <i
                onClick={() => {
                  this.play()
                }}
                class={`music-start`}
              ></i>
            )}
            <i
              onClick={() => {
                this.next()
              }}
              class={`music-forward`}
            ></i>
          </div>
        </div>
      </>
    )
  }
})
