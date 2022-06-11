import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findUserFollowsList, findUserFollowedList } from '@/api/user'
import './style'
const UserFollows = defineComponent({
  name: 'UserFollows',
  setup(props, { emit }) {
    const route = useRoute()
    const follows = ref([])
    watch(
      () => route.fullPath,
      () => {
        if (route.fullPath === `/user/follows/${route.params.id}`) {
          findUserFollowsList(route.params.id as string).then(res => {
            follows.value = res.follow
          })
        } else {
          findUserFollowedList(route.params.id as string).then(res => {
            follows.value = res.followeds
            console.log(res)
          })
        }
      },
      { deep: true, immediate: true }
    )
    return {
      follows
    }
  },
  render() {
    return (
      <div class={`card`}>
        <div class="user-follows-container">
          {this.follows.map(item => {
            return (
              <div
                onClick={() => this.$router.push(`/user/${item.userId}/detail`)}
                class="user-follows-container-item"
              >
                <div class="follows-img">
                  <img class={`img`} v-lazy={item.avatarUrl} alt="" />
                  {item.avatarDetail?.identityIconUrl ? (
                    <img
                      class={`img-detail`}
                      v-lazy={item.avatarDetail?.identityIconUrl}
                      alt=""
                    />
                  ) : (
                    ''
                  )}
                </div>
                <div class="follows-container">
                  <div>{item.nickname}</div>
                  <div class={`ellipsis `}>{item.signature}</div>
                  <div>
                    歌单: {item.playlistCount} | 粉丝: {item.followeds}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
})

export default UserFollows
