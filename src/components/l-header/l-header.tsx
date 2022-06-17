import { defineComponent, ref, watch, onMounted } from 'vue'
import { searchHot, defaultSearch } from '@/api/search'
import LButton from '@/library/l-button/l-button.tsx'
import HeaderDialog from './components/header-dialog'
import HeaderPag from './components/header-pag'
import { timeFormat } from '@/hooks'
import { RouterLink, useRouter } from 'vue-router'
import logoImg from '@/assets/image/logo.png'
import Login from '@/views/Login/Login'
import { useUser } from '@/stores/user'
// logo 图片导入
import { userSubList, logoutUser } from '@/api/user'
import './style'
// import 'element-plus/theme-chalk/el-autocomplete.css'
const LHeader = defineComponent({
  name: 'LHeader',
  components: { LButton },
  setup() {
    const UStore = useUser()
    const router = useRouter()
    // 组件
    const HD = ref<InstanceType<typeof HeaderDialog>>()
    const search = ref('')
    // 个人信息
    const profile = ref()
    // 用户详情
    const userDetail = ref()
    const isLogin = ref(false)
    // 默认搜索
    const default_ = ref('')
    // 热门搜索
    const hot_ = ref([])
    // 搜索的名字
    const searchName = ref('')
    // 切换全屏
    const allP = ref(false)
    // 绑定回车登录
    const inputRef = ref()
    // 搜索函数
    const btnClick = () => {
      if (searchName.value === '') {
        router.push(`/search/${default_.value}`)
      } else {
        router.push(`/search/${searchName.value}`)
      }
      console.log(searchName.value)
    }
    // 登录显示
    const login = () => {
      isLogin.value = true
    }
    // 更新数据
    watch(
      () => UStore.profile,
      async () => {
        profile.value = UStore.profile.code ? UStore.profile : null
        const list = await userSubList(profile.value?.userId)
        UStore.likeList = list.ids
      },
      { immediate: true, deep: true }
    )
    watch(
      () => UStore.userDetail,
      () => {
        userDetail.value = UStore.userDetail
      },
      { immediate: true, deep: true }
    )
    // 退出登录
    const logout = () => {
      profile.value = null
      userDetail.value = null
      UStore.$reset()
      logoutUser()
      const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie =
      cookie.replace(/^ +/, '')
      .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
      window.localStorage.removeItem('pinia-useUser')
    }
    // 初始化
    onMounted(async () => {
      inputRef.value.inputRef.handleKeydown = function (e: any) {
        if (e.keyCode === 13) {
          btnClick()
        }
      }
      const hot: any = await searchHot()
      const de = await defaultSearch()
      default_.value = de.data.showKeyword
      hot_.value = hot!.result.hots.map((item: any, index: number) => {
        return {
          value: item.first
        }
      })
    })
    // 显示项目信息
    const show_detail = () => {
      HD.value?.show()
    }
    // 搜索下拉框选择事件
    const handleSelect = e => {
      router.push(`/search/${e.value}`)
    }
    // 搜索下拉框绑定值
    const querySearch = (queryString: string, cb) => {
      cb(hot_.value)
    }
    // 切换全屏函数
    const toggleAllP = () => {
      allP.value = !allP.value
      if (allP.value) {
        document.documentElement.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    }
    return {
      btnClick,
      login,
      search,
      isLogin,
      profile,
      userDetail,
      logout,
      handleSelect,
      show_detail,
      default_,
      hot_,
      searchName,
      querySearch,
      toggleAllP,
      inputRef,
      HD
    }
  },
  render() {
    return (
      <>
        <div class="l-header">
          <div class="center">
            <RouterLink to="/">
              <img
                style={`width: 60px; height: 60px;`}
                src={logoImg}
                alt="logo"
              />
            </RouterLink>
            <span style={`margin: 0 5px;`} onClick={() => this.show_detail()}>
              代码开始旅行的地方
            </span>
          </div>
          <div class="left">
            {/* 导航组件 */}
            <HeaderPag></HeaderPag>
          </div>
          <div class="right">
            <el-autocomplete
              v-model={this.searchName}
              placeholder={this.default_}
              popper-class="my-autocomplete"
              fetch-suggestions={this.querySearch}
              onSelect={this.handleSelect}
              ref="inputRef"
            ></el-autocomplete>
            <el-button onClick={() => this.btnClick()}>
              <i class="iconfont l-sousuo search"></i>
            </el-button>
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
                          <img
                            onClick={() =>
                              this.$router.push(
                                `/user/${this.profile?.profile?.userId}/detail`
                              )
                            }
                            src={this.profile?.profile?.avatarUrl}
                          />
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
                              <li
                                style={`cursor: pointer;`}
                                onClick={() =>
                                  this.$router.push(
                                    `/user/follows/${this.$route.params.id}`
                                  )
                                }
                              >
                                <h1>{this.userDetail?.profile?.follows}</h1>
                                <div>关注</div>
                              </li>
                              <li
                                style={`cursor: pointer;`}
                                onClick={() =>
                                  this.$router.push(
                                    `/user/followed/${this.$route.params.id}`
                                  )
                                }
                              >
                                <h1>{this.userDetail?.profile?.followeds}</h1>
                                <div>粉丝</div>
                              </li>
                            </ul>
                          </div>
                          {/* <hr style={`margin: 10px 0;`} /> */}

                          <div class={`level`}>
                            <span>ID</span>
                            <span>{this.userDetail?.profile?.userId}</span>
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
                          {/* <hr style={`margin: 10px 0;`} /> */}
                          <div
                            onClick={() =>
                              this.$router.push(
                                `/user/${this.profile?.profile?.userId}/detail`
                              )
                            }
                            style={`cursor: pointer;`}
                            class={`level`}
                          >
                            <span>个人主页</span>
                            <span>
                              <i class={`iconfont l-31fanhui2`}></i>
                            </span>
                          </div>
                          <div
                            style={`cursor: pointer;`}
                            onClick={() => {
                              this.logout()
                              this.$router.replace('/recommend')
                            }}
                            class={`level`}
                          >
                            <span>退出登录</span>
                            <span>
                              <i class={`iconfont l-31fanhui2`}></i>
                            </span>
                          </div>
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
        {/*  项目详情  */}
        <HeaderDialog ref="HD"></HeaderDialog>
      </>
    )
  }
})

export default LHeader
