import { defineComponent, Teleport, ref, onMounted, onUnmounted } from 'vue'
import AccountLogin from './components/account-login'
import PhoneLogin from './components/phone-login'
import QRLogin from './components/QR-login'
import LoginBg from '@/assets/image/login-bg.jpeg'
import imgUrl from '@/assets/image/logo.png'
import { onClickOutside } from '@vueuse/core'
import './style'
const Login = defineComponent({
  name: 'Login',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'logout'],
  setup(props, { emit }) {
    const isLC = ref(false)
    const music__ = ref()
    const activeName = ref('QR')
    onMounted(() => {
      document.body.parentNode!.style.overflowY = 'hidden'
      isLC.value = true
    })
    onUnmounted(() => {
      document.body.parentNode!.style.overflowY = 'auto'
    })
    onClickOutside(music__, () => {
      emit('logout', false)
    })
    return {
      LoginBg,
      isLC,
      activeName,
      music__
    }
  },
  render() {
    return (
      <Teleport to={`body`}>
        <div
          class={`login-container ${
            this.isLC ? 'login-container-animation' : ''
          }`}
        >
          <div
            ref="music__"
            class={`login-container-auto ${
              this.isLC ? 'login-container-auto-animation' : ''
            }`}
          >
            <div class={`login-container-auto-left `}>
              <img v-lazy={this.LoginBg} alt="原神 刻晴" title="刻晴 ~~" />
            </div>
            <div class={`login-container-auto-right `}>
              <i
                onClick={() => {
                  this.$emit('logout', false)
                }}
                class={`l-quxiao logout iconfont`}
              ></i>
              <div class="selected-login">
                <h1>欢迎登录 Cloud Music</h1>
                <el-tabs stretch v-model={this.activeName}>
                  <el-tab-pane label="帐号登录" name="Account"></el-tab-pane>
                  <el-tab-pane label="扫码登录" name="QR"></el-tab-pane>
                  <el-tab-pane label="短信登录" name="Phone"></el-tab-pane>

                  {this.activeName === 'Account' ? (
                    <AccountLogin
                      onAccount-success={() => this.$emit('logout', false)}
                    ></AccountLogin>
                  ) : this.activeName === 'QR' ? (
                    <QRLogin
                      onQr-success={() => this.$emit('logout', false)}
                    ></QRLogin>
                  ) : (
                    <PhoneLogin
                      onPhone-success={() => this.$emit('logout', false)}
                    ></PhoneLogin>
                  )}
                </el-tabs>
              </div>
              <div class={`zs`}>
                <img v-lazy={imgUrl} alt="" />
                <ul>
                  <li>纯属个人练习开发网站 如有问题请联系我</li>
                  <li>
                    数据来源于开源后台{' '}
                    <a
                      style={`color: pink;`}
                      target="__blank"
                      href="https://neteasecloudmusicapi.vercel.app/#/"
                    >
                      地址
                    </a>
                  </li>
                  <li>QQ: 1415797580</li>
                  <li>Q裙: 811481586</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    )
  }
})

export default Login
{
  /* <el-dialog
        v-model={this.$props.modelValue}
        title="Tips"
        width="30%"
  >
    {{ footer: () => {
      return <>
          <el-button onClick={() => {
            this.$emit('update:modelValue', false)
          }}>Cancel</el-button>
          <el-button type="primary" click="dialogVisible = false">Confirm</el-button>
      </>
    }}}
  </el-dialog> */
}
