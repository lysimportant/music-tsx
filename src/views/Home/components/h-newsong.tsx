import { defineComponent, withModifiers, ref, onMounted } from 'vue'
import LMore from '@/components/l-more/l-more'
import { findNewSong } from '@/api/home'
import { useMusic } from '@/stores/music'
import { playSongTime, isLoginStatus, useOperateLikeMusic } from '@/hooks'
import { useUser } from '@/stores/user'
import Toast from '@/plugins/Toast'
import './style/h-newsong'
const HNewSong = defineComponent({
  name: 'HNewSong',
  components: {
    LMore
  },
  async setup(props, { emit }) {
    // 新音乐
    const MStore = useMusic()
    const UStore = useUser()
    const result = ref()
    const getSong = async () => {
      const res = await findNewSong()
      result.value = res!.result
    }
    onMounted(() => {
      getSong()
    })
    // 播放音乐
    const playMusic = (item: any) => {
      MStore.playMusic(item.id)
      console.log('play', item)
    }

    const likeMusic = id => {
      console.log(id)
      const isLogin = isLoginStatus()
      if (isLogin.value) {
        useOperateLikeMusic(id, UStore.profile.profile.userId).then(() => {
          getSong()
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
      result,
      playMusic,
      likeMusic,
      testActive
    }
  },
  render() {
    return (
      <div class={`newsong-container container`}>
        <LMore title="新音乐" to="/newsong"></LMore>
        {this.result?.map(item => {
          return (
            <div
              class="newsong-container-item"
              onClick={withModifiers(
                () => this.playMusic(item),
                ['stop', 'prevent']
              )}
            >
              <img v-lazy={item.picUrl} alt="" />
              <span class={`songname`}>{item.name}</span>
              <span class={`singername`}>
                {item.song.album.artists[0].name}
              </span>
              <span class={`songtime`}>{playSongTime(item.song.duration)}</span>
              <i class={`iconfont newsong-bofang l-24gf-playCircle`}></i>
              {this.testActive(item.id) ? (
                <span
                  key={new Date() + ''}
                  onClick={withModifiers(
                    () => this.likeMusic(item.id),
                    ['stop', 'prevent']
                  )}
                  title="取消喜欢"
                  class={`iconfont active newsong-shoucang l-shoucang`}
                ></span>
              ) : (
                <span
                  onClick={withModifiers(
                    () => this.likeMusic(item.id),
                    ['stop', 'prevent']
                  )}
                  key={new Date() + ''}
                  title="喜欢"
                  class={`iconfont newsong-shoucang l-shoucang`}
                ></span>
              )}
            </div>
          )
        })}
      </div>
    )
  }
})

export default HNewSong
