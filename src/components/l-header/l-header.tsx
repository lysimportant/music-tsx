import { defineComponent, ref } from 'vue'
import LButton from '@/library/l-button/l-button.tsx'
import LInput from '@/library/l-input/l-input'
import { RouterLink } from 'vue-router'
import { arr } from './config'
import './style'
const LHeader = defineComponent({
  name: 'LHeader',
  components: { LButton, LInput },
  setup() {
    const search = ref('')
    const btnClick = () => {
      console.log('btnClick 按钮成功点击了')
    }
    return {
      btnClick,
      search
    }
  },
  render () {
    return (
      <>
        <div class="l-header">
          <div class="left">
            <ul>
              {/* 渲染列表 */}
              {arr.map(item => {
                return (
                  <>
                    {/^\//.test(item.name) ? (
                      <li>
                        <RouterLink to="/">
                          <img src={item.name} alt="logo" />
                        </RouterLink>
                      </li>
                    ) : (
                      <li>
                        <RouterLink to={item.path}>{item.name}</RouterLink>
                      </li>
                    )}
                  </>
                )
              })}
            </ul>
          </div>
          <div class="center">
            <span>代码开始旅行的地方</span>
          </div>
          <div class="right">
            <LInput showPssword clearable active v-model={this.search}></LInput>
            <LButton onClick={() => this.btnClick()}>
              <i class='iconfont l-sousuo search'></i>
              {/* <svg class="icon search" aria-hidden="true">
                <use xlinkHref="#l-sousuo"></use>
              </svg> */}
            </LButton>
            <div class={'header-user'}>
              <i class='iconfont l-user'></i>
              <span> 请先登录</span>
            </div>
          </div>
        </div>
      </>
    )
  }
})

export default LHeader
