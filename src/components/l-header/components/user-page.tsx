import { defineComponent } from 'vue'
import { timeFormat } from '@/hooks'
const UserPage = defineComponent({
  name: 'UserPage',
  props: {
    profile: {
      type: Object,
      default: () => ({})
    },
    userDetail: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['login', 'logout'],
  setup(props, { emit }) {},
  render() {
    return (
      <>
        {this.profile ? (
          <div class={'header-user'}>
            <el-popover placement="bottom-start" width={350} trigger="hover">
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
                        alt=""
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
                        <span>{timeFormat(this.userDetail?.createTime)}</span>
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
                          this.$emit('logout')
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
          <div class={'header-user'} onClick={() => this.$emit('login')}>
            <i class="iconfont l-user"></i>
            <span> 请先登录</span>
          </div>
        )}
      </>
    )
  }
})

export default UserPage
