import { defineComponent } from 'vue'
const SearchUser = defineComponent({
  name: 'SearchUser',
  props: {
    search_: Array,
    default: () => []
  },
  setup(props, { emit }) {
    return {}
  },
  render() {
    return (
      <>
        <div class={`search-res-user-container`}>
          {this.search_?.map((item: any) => {
            return (
              <div
                onClick={() => {
                  this.$router.push(`/user/${item.userId}/detail`)
                }}
                class={`search-res-user-container-item`}
              >
                <img v-lazy={item?.avatarUrl} alt="" />
                {item?.avatarDetail?.identityIconUrl ? (
                  <img
                    class={`user-di`}
                    v-lazy={item?.avatarDetail?.identityIconUrl}
                    alt=""
                  />
                ) : (
                  ''
                )}
                <span>{item.nickname}</span>
                {/* 1 男 2 女 0 没定 */}
                {item.gender === 0 ? (
                  <svg class="icon" aria-hidden="true">
                    <use href="#l-nannv-1"></use>
                  </svg>
                ) : item.gender === 1 ? (
                  <svg class="icon" aria-hidden="true">
                    <use href="#l-nan"></use>
                  </svg>
                ) : (
                  <svg class="icon" aria-hidden="true">
                    <use href="#l-xingbienv"></use>
                  </svg>
                )}
                <i class={`ellipsis-2`}>
                  {item?.signature?.length > 0
                    ? item?.signature
                    : item.description}
                </i>
              </div>
            )
          })}
        </div>
      </>
    )
  }
})

export default SearchUser
