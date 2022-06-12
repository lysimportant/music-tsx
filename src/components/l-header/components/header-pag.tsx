import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { arr } from '../config'

const HeaderPag = defineComponent({
  name: 'HeaderPag',
  setup(props, { emit }) {
    const allP = ref(false)

    const toggleAllP = () => {
      allP.value = !allP.value
      if (allP.value) {
        document.documentElement.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    }
    return {
      toggleAllP
    }
  },
  render() {
    return (
      <ul class={`header-ul`}>
        {/* 渲染列表 */}
        {arr.map(item => {
          return (
            <li>
              <RouterLink to={item.path}>
                <span
                  class={`${this.$route.path === item.path ? 'active' : ''}`}
                >
                  {item.name}
                </span>
              </RouterLink>
            </li>
          )
        })}
        <li>
          <span onClick={() => this.toggleAllP()}>切换全屏</span>
        </li>
        <li>
          <span title="后退" onClick={() => this.$router.go(-1)}>
            <i style={`font-size: 20px;`} class={`iconfont l-31fanhui1`}></i>
          </span>
          <span title="前进" onClick={() => this.$router.go(1)}>
            <i style={`font-size: 20px;`} class={`iconfont l-31fanhui2`}></i>
          </span>
        </li>
      </ul>
    )
  }
})

export default HeaderPag
