import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import './style'
const LMore = defineComponent({
  name: "LMore",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    to: {
      type: String,
      defalut: ""
    }
  },
  setup (props, { emit }) {
    return {}
  },
  render () {
    return <>
      <div class={`l-more`}>
        <div class={`l-more-left`}>
          { this.to ?<RouterLink to={this.to}><h3>{this.title} <i class={`iconfont l-31fanhui2`}></i></h3></RouterLink> : <h3>{this.title} <i class={`iconfont l-31fanhui2`}></i></h3>}
        </div>
        <div class={`l-more-right`}>{ this.$slots.default && this.$slots.default()}</div>
      </div>
    </>
  }
})

export default LMore
