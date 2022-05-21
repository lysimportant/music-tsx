import { defineComponent, ref } from 'vue'
import './style'
const LCarousel = defineComponent({
  name: 'LCarousel',
  props: {
    height: {
      type: Number,
      default: 400
    },
    width: {
      type: Number,
      default: 1400
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3
    }
  },
  setup(props, { slots }) {
    // 获取动态插槽
    const panels = slots.default()
    const dynamicArrar = []
    panels.forEach((item: any) => {
      if (item.type.name) {
        dynamicArrar.push(item)
      } else {
        item.children.forEach((item: any) => {
          dynamicArrar.push(item)
        })
      }
    })
    // 当前页面
    const curretnIndex = ref(0)
    // 箭头显示
    const showArrow = ref(false)
    // 定时器的存储
    let timer: any = null
    // 自动轮播图片
    const autoPlayer = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        if (curretnIndex.value >= dynamicArrar?.length - 1) {
          curretnIndex.value = 0
        } else {
          curretnIndex.value += 1
        }
      }, props.duration * 1000)
    }
    // 清空
    if (timer) {
      clearInterval(timer)
    }
    //
    if (props.autoPlay) {
      autoPlayer()
    }
    return {
      curretnIndex,
      showArrow,
      timer,
      autoPlayer,
      dynamicArrar
    }
  },
  render() {
    // 组件合成
    const node = this.dynamicArrar.map((item, index) => {
      return (
        <>
          <img
            style={`z-index: ${this.curretnIndex === index ? 1 : 0}`}
            src={item.props.imgUrl}
            alt=""
          />
        </>
      )
    })
    const lis = this.dynamicArrar.map((item, index) => {
      return (
        <>
          <li
            onClick={() => {
              this.curretnIndex = index
            }}
            class={`${this.curretnIndex === index ? 'active' : ''}`}
          />
        </>
      )
    })

    return (
      <div
        class="l-carousel container"
        onMouseenter={() => {
          ;(this.showArrow = true), clearInterval(this.timer)
        }}
        onMouseleave={() => {
          ;(this.showArrow = false), this.autoPlayer()
        }}
        style={`height:${this.height}px; width: ${this.width}px !important}`}
      >
        <div class={`l-carousel-container`}>{node}</div>
        {/* 后退/ 前进 操作 */}
        {this.showArrow ? (
          <>
            <i
              onClick={() => {
                if (this.curretnIndex <= 0) {
                  this.curretnIndex = this.dynamicArrar.length
                }
                this.curretnIndex--
              }}
              class={`arrow iconfont l-31fanhui1 arrow-left`}
            ></i>
            <i
              onClick={() => {
                if (this.curretnIndex >= this.dynamicArrar.length - 1) {
                  this.curretnIndex = 0
                } else {
                  this.curretnIndex++
                }
              }}
              class={`arrow iconfont l-31fanhui2 arrow-right`}
            ></i>
          </>
        ) : (
          ''
        )}
        <ul class={'orgin'}>{lis}</ul>
      </div>
    )
  }
})

export default LCarousel
