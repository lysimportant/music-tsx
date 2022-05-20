import { defineComponent } from 'vue'
import './style'
const LButton = defineComponent({
  name: 'LButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "middle"
    }
  },
  render() {
    return (
      <button
        class={`${this.disabled ? `l-button-${this.type}-disabled` : ''}
        l-button ${this.circle ? 'circle' : ''} ${
          this.round ? 'round' : ''
        } l-button-${this.type} ${this.size ?? ''} `}
      >
        {this.$slots.default && this.$slots.default()}
      </button>
    )
  }
})

export default LButton
