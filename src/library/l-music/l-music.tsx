import { defineComponent, ref, watch, onMounted } from 'vue'
import { playSongTime } from '@/hooks/index'
import { findMusicLyrics } from '@/api/music'
import { useMusic } from '@/stores/music'
import LMusicList from './components/l-music-list'
import './style'
import Toast from '@/plugins/Toast'
export default defineComponent({
  name: 'LMusic',
  props: {
    audio: {
      type: Array,
      default: (): any => []
    }
  },
  setup(props, { expose }) {
    // 是否播放
    const store = useMusic()
    const show = ref(true)
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
      if (store.list.length > 0) {
        playing.value = true
        progress.value = 0
        store.isPlay = true
        store.lrc = ''
        // timer && clearTimeout(timer)
        // timer = setTimeout(() => {
        //   audioRef.value.play()
        // }, 200)

        // console.log('播放', currentIndex.value)
        findMusicLyrics(store.list[currentIndex.value].id).then(res => {
          console.log(res)
          store.lrc = res.lrc.lyric.split('\n') ?? '暂无歌词'
          store.currentMusic = store.list[currentIndex.value]
          audioRef.value.play()
        })
      }
    }
    onMounted(() => {
      audioRef.value.volume = volume.value / 100
      store.isPlay = false
      // 空格暂停
      document.onkeydown = function (e) {
        if (e.key === ' ' && store.list.length > 0) {
          // store.
          e.preventDefault()
          store.isPlay = !store.isPlay
          toggle()
          return e.defaultPrevented
        }
      }
    })
    watch(
      () => store.list,
      () => {
        if (store.list.length > 0) {
          progress.value = 0
          play()
        }
      },
      {
        deep: true
      }
    )
    watch(
      () => store.isPlay,
      () => {
        if (store.isPlay) {
          progress.value = 0
          play()
        } else {
          pause()
        }
      },
      {
        deep: true
      }
    )
    // watch(
    //   () => props.audio,
    //   () => {
    //     if (props.audio?.length === 1) {
    //       progress.value = 0
    //       play()
    //     }
    //   },
    //   {
    //     deep: true
    //   }
    // )
    // 暂停
    const pause = () => {
      playing.value = false
      audioRef.value.pause()
      store.isPlay = false
    }
    // 下一首
    const next = () => {
      pause()
      currentIndex.value += 1
      if (currentIndex.value > store.list.length - 1) {
        currentIndex.value = 0
      }
      progress.value = 0
      setTimeout(() => {
        play()
      }, 0)
    }
    // 切换
    const toggle = () => {
      if (playing.value) {
        playing.value = false
        pause()
      } else {
        playing.value = true
        play()
      }
    }
    // 后退
    const back = () => {
      pause()
      currentIndex.value -= 1
      if (currentIndex.value < 0) {
        currentIndex.value = store.list.length - 1
        if (currentIndex.value < 0) {
          currentIndex.value = 0
        }
      }
      progress.value = 0
      setTimeout(() => {
        play()
      }, 0)
    }
    const volumeInput = (val: number) => {
      audioRef.value && (audioRef.value.volume = val / 100)
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
    // 改变播放进度
    const changeProgress = val => {
      if (playing) {
        audioRef.value.currentTime = progress.value
        play()
      }
    }
    function getTime(time: number) {
      // 转换为式分秒
      let m: any = parseInt(((time / 60) % 60) + '')
      m = m < 10 ? '0' + m : m
      let s: any = parseInt((time % 60) + '')
      s = s < 10 ? '0' + s : s
      // 作为返回值返回
      return m + ':' + s
    }
    // 切换播放
    const togglePlay = id => {
      const res = props.audio?.findIndex(item => item.id === id)
      if (currentIndex.value !== res) {
        pause()
        progress.value = 0
        currentIndex.value = res!
        Toast('success', `已为您切换到 ${props!.audio[res].songName}`)
        setTimeout(() => {
          play()
        }, 1)
      } else {
        Toast('info', '当前歌曲正在播放!')
        play()
      }
    }
    const clearList = () => {
      progress.value = 0
      currentIndex.value = 0
      show.value = true
      store.$reset()
    }
    watch(
      () => props.audio,
      () => {
        if (props.audio?.length <= 0) {
          show.value = true
          showList.value = false
        }
      }
    )
    const delete_ = id => {
      const res = props.audio?.findIndex(item => item.id === id)
      if (!store.isPlay) {
        pause()
        progress.value = 0
        store.deleteMusic(id)
        play()
      } else {
        store.deleteMusic(id)
        if (res < currentIndex.value) {
          currentIndex.value -= 1
        } else if (res === currentIndex.value) {
          progress.value = 0
          play()
        }
      }
      // if (props?.audio?.length < 1) {
      //   show.value = true
      //   showList.value = false
      // }
      expose({
        toggle,
        play,
        pause,
        next,
        back
      })
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
      getTime,
      togglePlay,
      clearList,
      delete_
    }
  },
  render() {
    return (
      <>
        <div class="l-music-container">
          <div
            style={`${this.showList ? 'height: 500px;' : ''}`}
            class={`l-music-list`}
          >
            {this.showList ? (
              <LMusicList
                onPut-away-list={() => {
                  this.showList = false
                  this.show = true
                }}
                onDelete_={id => this.delete_(id)}
                currentIndex={this.currentIndex}
                onClearList={() => this.clearList()}
                onTogglePlay={e => this.togglePlay(e)}
                audio={this.audio}
                onPutAwayList={() => {
                  this.show = true, this.showList = false
                  console.log('shia')
                }}
              ></LMusicList>
            ) : (
              ''
            )}
          </div>

          {/* 显示隐藏 */}
          <i
            title="显示/隐藏控件"
            onClick={() => (
              (this.show = !this.show), (this.showList = !this.showList)
            )}
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
            {this.audio!.length > 0 ? (
              <>
                <img
                  onClick={() => {
                    this.$router.push(
                      `/lrc/${this.audio[this.currentIndex]?.id}/${
                        this.audio[this.currentIndex]?.songName
                      }`
                    )
                    this.showList = false
                    this.show = true
                  }}
                  class={`${this.playing ? 'music_play' : ''}`}
                  src={this.audio[this.currentIndex]?.picUrl}
                  alt=""
                ></img>
                {/* <i  class={`iconfont show-lrc l-31fanhui1`}></i> */}
              </>
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
              <span class={`singerName `}>
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
