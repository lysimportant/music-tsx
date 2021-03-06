import { defineComponent, onMounted, ref, watch, withModifiers } from 'vue'
import { useRoute } from 'vue-router'
import { useUser } from '@/stores/user'
import {
  findUserDetail,
  findUserPlayList,
  findUserAudioList,
  subUser
} from '@/api/user'

import LRecommend from '@/components/l-recommend/l-recommend'
import './style'
import Toast from '@/plugins/Toast'
const UserInfo = defineComponent({
  name: 'UserInfo',
  setup(props, { emit }) {
    const UStore = useUser()
    const route = useRoute()
    const userDetail = ref()
    const show = ref(true)
    const activeName = ref('song')
    const detail = ref()
    const myPlayList = ref([])
    const mySubsList = ref([])
    const audio = ref([])
    const getInfo = async () => {
      userDetail.value = UStore.userDetail
      detail.value = await findUserDetail(route.params.id as string)
      if (UStore.userDetail?.profile?.userId === route.params.id * 1) {
        const res = await findUserAudioList()
        audio.value = res.djRadios
        console.log(audio.value)
      } else {
        console.log('播客')
      }
      const res: any = await findUserPlayList(route.params.id as string)
      res?.playlist?.map(item => {
        if (!item.subscribed) {
          myPlayList.value.push(item)
        } else {
          mySubsList.value.push(item)
        }
      })
    }
    onMounted(async () => {
      getInfo()
    })
    watch(
      () => route.params.id,
      async () => {
        myPlayList.value = []
        mySubsList.value = []
        audio.value = []
        getInfo()
        detail.value = await findUserDetail(route.params.id as string)
      }
    )
    watch(
      () => UStore,
      async () => {
        UStore.$reset()
      }
    )
    const operateSub = async () => {
      if (UStore?.profile.code === 200) {
        const t = detail.value.profile.followed === true ? 0 : 1
        const res = await subUser(detail.value.profile.userId, t)
        if (res.code === -462) {
          return Toast('warning', '关注失败, 需要官方的' + res.data.blockText)
        }
        console.log('收藏切换', t)
        if (t === 0) {
          Toast(
            'success',
            `已为您取消了 ${detail.value.profile.nickname} 的关注`
          )
        } else {
          Toast('success', `已为您关注了 ${detail.value.profile.nickname} `)
        }
        console.log(res)
        getInfo()
      } else {
        Toast('warning', '亲, 请先登录再操作噢')
      }
    }
    return {
      userDetail,
      detail,
      show,
      myPlayList,
      mySubsList,
      activeName,
      audio,
      operateSub
    }
  },
  render() {
    return (
      <div class={`card`}>
        <div class="user-header clearfix">
          <div class="user-header-left">
            <img v-lazy={this.detail?.profile?.avatarUrl} alt="" />
          </div>
          <div class="user-header-right">
            <div class="name-level">
              <div class={`name`}>{this.detail?.profile.nickname}</div>
              <div class={`level clearfix`}>
                <div>
                  {this.detail?.profile.mainAuthType ? (
                    <span class={`auth`}>
                      <img
                        style={`width: 20px; height: 20px; margin-bottom: 4px; margin-right: 5px;`}
                        v-lazy={this.detail?.identify.imageUrl}
                        alt=""
                      />
                      {this.detail?.profile.mainAuthType.desc}
                    </span>
                  ) : (
                    ''
                  )}

                  <i class={`level-icon`}>Lv {this.detail?.level}</i>
                  {/* 1 男 2 女 0 没定 */}
                  {this.detail?.profile.gender === 0 ? (
                    <svg class="icon" aria-hidden="true">
                      <use href="#l-nannv-1"></use>
                    </svg>
                  ) : this.detail?.profile.gender === 1 ? (
                    <svg class="icon" aria-hidden="true">
                      <use href="#l-nan"></use>
                    </svg>
                  ) : (
                    <svg class="icon" aria-hidden="true">
                      <use href="#l-xingbienv"></use>
                    </svg>
                  )}
                  {this.userDetail?.profile?.userId ===
                  this.detail?.profile.userId ? (
                    <el-button round>修改个人信息</el-button>
                  ) : (
                    <el-button onClick={() => this.operateSub()} round>
                      {this.detail?.profile?.followed ? '已关注' : '关注'}
                    </el-button>
                  )}
                </div>
              </div>
            </div>
            <div class="other clearfix">
              <ul>
                <li>
                  <h1>{this.detail?.profile.eventCount}</h1>
                  <span>动态</span>
                </li>
                <li
                  style={`cursor: pointer;`}
                  onClick={() =>
                    this.$router.push(`/user/follows/${this.$route.params.id}`)
                  }
                >
                  <h1>{this.detail?.profile.follows}</h1>
                  <span>关注</span>
                </li>
                <li
                  style={`cursor: pointer;`}
                  onClick={() =>
                    this.$router.push(`/user/followed/${this.$route.params.id}`)
                  }
                >
                  <h1>{this.detail?.profile.followeds}</h1>
                  <span>粉丝</span>
                </li>
              </ul>
            </div>
            <div
              class={` singer-info ${this.show ? 'ellipsis' : ''}  clearfix`}
            >
              <i
                onClick={() => (this.show = !this.show)}
                style={` transform: rotate(${this.show ? '-90deg' : '90deg'});`}
                class={`iconfont  show-user-info l-31fanhui1`}
              ></i>
              <div>
                个人介绍:{' '}
                {this.detail?.profile.signature
                  ? this.detail?.profile.signature
                  : '这人很懒 什么也没有留'}
              </div>
            </div>
          </div>
        </div>
        <div class={`user-body`}>
          <el-tabs v-model={this.activeName}>
            <el-tab-pane
              label={`创建的歌单 ${this.myPlayList.length}`}
              name="song"
            >
              {this.myPlayList.length > 0 ? (
                <LRecommend list={this.myPlayList}></LRecommend>
              ) : (
                <div class={`user-none`}>暂无创建歌单</div>
              )}
            </el-tab-pane>
            <el-tab-pane
              label={`收藏的歌单 ${this.mySubsList.length}`}
              name="subs"
            >
              {this.myPlayList.length > 0 ? (
                <LRecommend list={this.mySubsList}></LRecommend>
              ) : (
                <div class={`user-none`}>暂无收藏歌单</div>
              )}
            </el-tab-pane>
            <el-tab-pane label={`收藏的播客 ${this.audio.length}`} name="dj">
              {this.audio.length > 0 ? (
                <>
                  {this.audio.map((item: any) => {
                    return (
                      <div
                        onClick={() => {
                          this.$router.push(`/dj/${item.id}/detail`)
                        }}
                        class={`dj`}
                      >
                        <img v-lazy={item.picUrl} alt="" />
                        <span class={`audio-info-`}>
                          {item.name}{' '}
                          <span class={`audio-info-category`}>
                            {item.category}
                          </span>
                        </span>
                        <i
                          class={`user-info-name-`}
                          style={`cursor: pointer;`}
                          onClick={withModifiers(() => {
                            this.$router.push(`/user/${item?.dj.userId}/detail`)
                          }, ['stop', 'prevent'])}
                        >
                          {item.dj.nickname}
                        </i>
                        <i>声音 {item.programCount}</i>
                      </div>
                    )
                  })}
                </>
              ) : (
                <div class={`user-none`}>暂无收藏播客</div>
              )}
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    )
  }
})

export default UserInfo
