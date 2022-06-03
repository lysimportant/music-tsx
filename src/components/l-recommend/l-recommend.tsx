import { defineComponent } from 'vue'
import './style'
import { playCountFormat } from '@/hooks'
const LRecommend = defineComponent({
  name: 'LRecommend',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  emits: ['itemClick'],
  setup(props, { emit }) {
    return {}
  },
  render() {
    return (
      <div class={`l-recommend-container`}>
        {this.list.map((item: any) => {
          return (
            <div
              class="l-recommend-container-item"
              onClick={() => {
                if (this.$route.path === '/singer') {
                  this.$router.push(
                    `/singerdetail/${item.id ?? item.accountId}`
                  )
                } else if (
                  this.$route.path === `/singerdetail/${this.$route.params.id}`
                ) {
                  this.$emit('itemClick', item)
                }
              }}
            >
              <img src={item.picUrl ?? item.coverImgUrl} alt="" />
              <p style={`margin: 5px 0 -5px;`} class={`ellipsis`}>
                {item.name}
              </p>

              {this.$route.path !== '/singer' ? (
                this.$route.path !==
                `/singerdetail/${this.$route.params.id}` ? (
                  <i class={`iconfont re-play l-24gf-playCircle`}></i>
                ) : (
                  ''
                )
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
