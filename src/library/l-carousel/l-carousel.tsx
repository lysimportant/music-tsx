import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
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
    },
    banner: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    // 获取动态插槽
    const panels = slots?.default()
    const dynamicArray: any[] = []
    panels?.forEach((item: any) => {
      if (item.type.name) {
        dynamicArray.push(item)
      } else {
        item.children?.forEach((item: any) => {
          dynamicArray.push(item)
        })
      }
    })
    // 当前页面
    const currentIndex = ref(0)
    // 箭头显示
    const showArrow = ref(false)
    // 定时器的存储
    let timer: any = null
    // 自动轮播图片
    const autoPlayer = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        if (currentIndex.value >= dynamicArray?.length - 1) {
          currentIndex.value = 0
        } else {
          currentIndex.value += 1
        }
      }, props.duration * 1000)
    }
    // 清空 加载时线清除再到下面开启
    if (timer) {
      clearInterval(timer)
    }
    // props 是否开始自动
    if (props.autoPlay) {
      autoPlayer()
    }
    // 鼠标进入清除自动播放
    const mouseenter = () => {
      showArrow.value = true
      clearInterval(timer)
    }
    // 鼠标离开添加自动播放
    const mouseleave = () => {
      showArrow.value = false
      autoPlayer()
    }
    // 上一页
    const onPage = () => {
      if (currentIndex.value <= 0) {
        currentIndex.value = dynamicArray.length
      }
      currentIndex.value--
    }
    // 下一页
    const downPage = () => {
      if (currentIndex.value >= dynamicArray.length - 1) {
        currentIndex.value = 0
      } else {
        currentIndex.value++
      }
    }
    return {
      currentIndex,
      showArrow,
      timer,
      dynamicArray,
      autoPlayer,
      mouseenter,
      mouseleave,
      onPage,
      downPage
    }
  },
  render() {
    // 组件合成
    const node = this.dynamicArray.map((item, index) => {
      return (
        <RouterLink to="/">
          <img
            style={`z-index: ${this.currentIndex === index ? 1 : 0}`}
            src={item.props.imgUrl}
          />
        </RouterLink>
      )
    })
    // 小浮点
    const lis = this.dynamicArray.map((item, index) => {
      return (
        <li
          onClick={() => {
            this.currentIndex = index
          }}
          class={`${this.currentIndex === index ? 'active' : ''}`}
        />
      )
    })

    return (
      <div
        class="l-carousel container"
        onMouseenter={() => this.mouseenter()}
        onMouseleave={() => this.mouseleave()}
        style={`height:${this.height}px; width: ${this.width}px !important}`}
      >
        <div class={`l-carousel-container`}>{node}</div>
        {this.showArrow ? (
          <>
            <i
              onClick={() => this.onPage()}
              class={`arrow iconfont l-31fanhui1 arrow-left`}
            ></i>
            <i
              onClick={() => this.downPage()}
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
