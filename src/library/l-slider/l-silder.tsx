import { defineComponent } from 'vue'
import './style'
export default defineComponent({
  name: 'LSilder',
  props: {
    height: {
      type: Number,
      default: 200
    }
  },
  setup() {
    const maskDown = $event => {
      const slider = document.getElementById('slider')
      const bar = document.getElementById('bar')
      const mask = document.getElementById('mask')
      // 拖动一定写到 down 里面才可以
      document.onmousemove = function (event) {
        // console.log(slider?.offsetHeight)
        // console.log(slider?.offsetWidth)
        console.log(event)
      }
      // let heightVal = $event.clientY - bar!.offsetHeight
      // console.log(heightVal)
      // document.onmousemove = function (event) {
      //   barheight = event.clientY - heightVal
      //   if (barheight < 0) {
      //     barheight = 0
      //   } else if (barheight > slider!.offsetHeight - bar!.offsetHeight) {
      //     barheight = slider!.offsetHeight - bar!.offsetHeight
      //     mask!.style.width = barheight +'px' ;
      //     bar!.style.left = barheight + "px";
      //   }
      // }
      // 取消事件
      document.onmouseup = function (event) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    return {
      maskDown
    }
  },
  render() {
    return (
      <div style={`height: ${this.height}px;`} class="l-slider" id="slider">
        <div class="l-bar" id="bar"></div>
        <div
          onMousedown={$event => {
            this.maskDown($event)
          }}
          class="l-mask"
          id="mask"
        ></div>
      </div>
    )
  }
})
