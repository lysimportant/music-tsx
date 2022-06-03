import { defineComponent } from 'vue'
import { playSongTime, playCountFormat } from '@/hooks'
import '../style/singer-detail-mv'
const SingerDetailMV = defineComponent({
  name: 'SingerDetailMV',
  props: {
    mv: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    return {}
  },
  render() {
    return (
      <div class={`singer-detail-mv-container`}>
        {this.mv?.map((item: any) => {
          return (
            <div
              onClick={() => {
                this.$router.push(`/mvdetail/${item.id}`)
              }}
              class={`singer-detail-mv-container-item`}
            >
              <img src={item.imgurl ?? item.cover} alt="" />
              <div class={`singer-detail-mv-container-item-top`}>
                <i class={`iconfont l-24gl-play`}></i>
                {playCountFormat(item.playCount)}
              </div>
              <div class={`singer-detail-mv-container-item-bottom`}>
                {playSongTime(item.duration)}
              </div>
              <div class={`singer-detail-mv-container-item-span ellipsis`}>
                <span>{item.name}</span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
})

export default SingerDetailMV
