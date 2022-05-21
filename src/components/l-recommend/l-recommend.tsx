import { defineComponent } from 'vue'
import './style'
import { playCountFormat } from '@/hooks'
const LRecommend = defineComponent({
  name: "LRecommend",
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  setup (props, { emit }) {
    return {}
  },
  render () {

    return <div class={`l-recommend-container`}>
      {this.list.map((item: any) => {
        return <div  class="l-recommend-container-item" onClick={() => {this.$router.push(`/`)}}>
          <img src={item.picUrl} alt="" />
          <p class={`ellipsis`}>{item.name}</p>
          <i class={`iconfont l-24gf-playCircle`}></i>
          <span class={`playcount`}>{playCountFormat(item.playCount)}</span>
        </div>
      })}

    </div>
  }
})

export default LRecommend
