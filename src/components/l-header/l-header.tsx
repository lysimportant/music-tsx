import { defineComponent, ref, watch } from 'vue'
import LButton from '@/library/l-button/l-button.tsx'
import LInput from '@/library/l-input/l-input'
import { RouterLink } from 'vue-router'
import { arr } from './config'
import Login from '@/views/Login/Login'
import { useUser } from '@/stores/user'
import { timeFormat } from '@/hooks'
import './style'
const LHeader = defineComponent({
  name: 'LHeader',
  components: { LButton, LInput },
  setup() {
    const UStore = useUser()
    const search = ref('')
    const profile = ref(null)
    const userDetail = ref()
    const isLogin = ref(false)
    const btnClick = () => {
      console.log('btnClick 按钮成功点击了')
    }
    const login = () => {
      isLogin.value = true
    }
    watch(
      () => UStore.profile,
      async () => {
        profile.value = UStore.profile.code ? UStore.profile : null
        userDetail.value = UStore.userDetail.code ? UStore.userDetail : null
      },
      { immediate: true, deep: true }
    )
    const logout = () => {
      profile.value = null
      userDetail.value = null
      UStore.$reset()
      window.localStorage.removeItem('pinia-useUser')
    }

    return {
      btnClick,
      login,
      search,
      isLogin,
      profile,
      userDetail,
      logout
    }
  },
  render() {
    return (
      <>
        <div class="l-header">
          <div class="left">
            {/* <el-button onClick={() => {
              document.documentElement.requestFullscreen()
            }}>全屏</el-button>
             <el-button onClick={() => {
              document.exitFullscreen()
            }}>退出全屏</el-button> */}
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
                        <RouterLink
                          class={`${
                            this.$route.path === item.path ? 'active' : ''
                          }`}
                          to={item.path}
                        >
                          {item.name}
                        </RouterLink>
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
            <LInput clearable active v-model={this.search}></LInput>
            <LButton onClick={() => this.btnClick()}>
              <i class="iconfont l-sousuo search"></i>
              {/* <svg class="icon search" aria-hidden="true">
                <use xlinkHref="#l-sousuo"></use>
              </svg> */}
            </LButton>
            {this.profile ? (
              <div class={'header-user'}>
                <el-popover
                  placement="bottom-start"
                  width={350}
                  trigger="hover"
                >
                  {{
                    reference: () => {
                      return (
                        <div>
                          <img src={this.profile?.profile?.avatarUrl} alt="" />
                          <span>{this.profile?.profile?.nickname}</span>
                        </div>
                      )
                    },
                    default: () => {
                      return (
                        <div class={`user-detail`}>
                          <div class="user-detail-data">
                            <ul>
                              <li>
                                <h1>{this.userDetail?.profile?.eventCount}</h1>
                                <div>动态</div>
                              </li>
                              <li>
                                <h1>{this.userDetail?.profile?.follows}</h1>
                                <div>关注</div>
                              </li>
                              <li>
                                <h1>{this.userDetail?.profile?.followeds}</h1>
                                <div>粉丝</div>
                              </li>
                            </ul>
                          </div>
                          <div class={`level`}>
                            <span>ID</span>
                            <span>{this.userDetail?.profile.userId}</span>
                          </div>
                          <div class={`level`}>
                            <span>等级</span>
                            <span>Lv{this.userDetail?.level}</span>
                          </div>
                          <div class={`level`}>
                            <span>听歌</span>
                            <span>{this.userDetail?.listenSongs}</span>
                          </div>
                          <div class={`level`}>
                            <span>创建日</span>
                            <span>{this.userDetail?.createDays}</span>
                          </div>

                          <div class={`level`}>
                            <span>创建时间</span>
                            <span>
                              {timeFormat(this.userDetail?.createTime)}
                            </span>
                          </div>
                          <el-button
                            onClick={() => this.logout()}
                          >
                            退出登录
                          </el-button>
                        </div>
                      )
                    }
                  }}
                </el-popover>
              </div>
            ) : (
              <div class={'header-user'} onClick={() => this.login()}>
                <i class="iconfont l-user"></i>
                <span> 请先登录</span>
              </div>
            )}
          </div>
        </div>
        {this.isLogin ? (
          <Login
            onLogout={() => {
              this.isLogin = false
            }}
          ></Login>
        ) : (
          ''
        )}
      </>
    )
  }
})

export default LHeader
