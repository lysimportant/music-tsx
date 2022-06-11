import { defineComponent, withModifiers } from 'vue'
import { findSongDetail } from '@/api/songDetail'
import { useMusic } from '@/stores/music'
import './style'
import { playCountFormat } from '@/hooks'
import { useRoute, useRouter } from 'vue-router'
const LRecommend = defineComponent({
  name: 'LRecommend',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    showPlay: {
      type: Boolean,
      default: true
    }
  },
  emits: ['itemClick'],
  setup(props, { emit }) {
    const MStore = useMusic()
    const route = useRoute()
    const router = useRouter()
    const playAllMusic = (id: any) => {
      console.log(id)
      MStore.$reset()
      findSongDetail(id).then((res: any) => {
        console.log(res.playlist)
        MStore.playMusic(
          res?.playlist.trackIds.map(item => item.id),
          1
        )
      })
    }
    const JumpRouter = item => {
      if (route.path === '/singer') {
        router.push(`/singerdetail/${item.id ?? item.accountId}`)
      } else if (route.path === `/singerdetail/${route.params.id}`) {
        router.push(`/singerdetail/${item.id ?? item.accountId}`)
      } else if (
        route.path ===
        `/search/${encodeURIComponent(route.params.comment as string)}`
      ) {
        // router.push(`/singerdetail/${item.id ?? item.accountId}`)
        if (item.accountId) {
          router.push(`/singerdetail/${item.id ?? item.accountId}`)
        } else if (item.type === '专辑' || item.type === 'Single') {
          router.push(`/album/${item.id ?? item.accountId}/detail`)
        } else if (item.actionType) {
          router.push(`/songlist/${item.id ?? item.accountId}/detail`)
        }
        console.log(item)
      } else {
        router.push(`/songlist/${item.id}/detail`)
      }
      emit('itemClick', item)
    }
    return {
      playAllMusic,
      JumpRouter
    }
  },
  render() {
    return (
      <div class={`l-recommend-container`}>
        {this.list.map((item: any) => {
          return (
            <div
              class="l-recommend-container-item"
              onClick={() => this.JumpRouter(item)}
            >
              <img v-lazy={item.picUrl ?? item.coverImgUrl} alt="" />
              <p style={`margin: 5px 0 -5px;`} class={`ellipsis`}>
                {item.name}
              </p>

              {/* {this.$route.path !== '/singer' ? (
                this.$route.path !==
                `/singerdetail/${this.$route.params.id}` ?
         this.$route.path !== `/search/${this.$route.params.comment}` ?          <i
         onClick={withModifiers(() => this.playAllMusic(item.id), ['stop', 'prevent'])}
         class={`iconfont re-play l-24gf-playCircle`}
       ></i>:'' : ''
              ) : ''} */}
              {this.showPlay ? (
                <i
                  onClick={withModifiers(
                    () => this.playAllMusic(item.id),
                    ['stop', 'prevent']
                  )}
                  class={`iconfont re-play l-24gf-playCircle`}
                ></i>
              ) : (
                ''
              )}
              {item.playCount > 0 ? (
                <span class={`playCount`}>
                  <i class={`iconfont l-24gl-play`}></i>
                  {playCountFormat(item.playCount)}
                </span>
              ) : (
                ''
              )}
            </div>
          )
        })}
      </div>
    )
  }
})

export default LRecommend
