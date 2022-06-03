import { defineComponent, Teleport, ref, onMounted, onUnmounted } from 'vue'
import AccountLogin from './components/account-login'
import PhoneLogin from './components/phone-login'
import QRLogin from './components/QR-login'
import LoginBg from '@/assets/image/login-bg.jpeg'
import imgUrl from '@/assets/image/logo.png'

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
    onMounted(() => {
      document.body.parentNode!.style.overflowY = 'hidden'
      isLC.value = true
    })
    onUnmounted(() => {
      document.body.parentNode!.style.overflowY = 'auto'
    })
    return {
      LoginBg,
      isLC
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
            class={`login-container-auto ${
              this.isLC ? 'login-container-auto-animation' : 'Not Class'
            }`}
          >
            <div class={`login-container-auto-left `}>
              <img src={this.LoginBg} alt="原神 刻晴" title="刻晴 ~~" />
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
                <el-tabs stretch>
                  <el-tab-pane label="扫码登录">
                    <QRLogin
                      onQr-success={() => this.$emit('logout', false)}
                    ></QRLogin>
                  </el-tab-pane>
                  <el-tab-pane label="帐号登录">
                    <AccountLogin
                      onAccount-success={() => this.$emit('logout', false)}
                    ></AccountLogin>
                  </el-tab-pane>
                  <el-tab-pane label="短信登录">
                    <PhoneLogin
                      onPhone-success={() => this.$emit('logout', false)}
                    ></PhoneLogin>
                  </el-tab-pane>
                </el-tabs>
              </div>
              <div class={`zs`}>
                <img src={imgUrl} alt="" />
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
