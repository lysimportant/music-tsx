import { defineComponent } from 'vue'
const SearchDj = defineComponent({
  name: 'SearchDj',
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
        <div class={`search-res-dj-container`}>
          {this.search_?.map((item: any) => {
            return (
              <div
                // onClick={() => {
                //   this.$router.push(`/user/${item.userId}/detail`)
                // }}
                class={`search-res-dj-container-item`}
              >
                <div class={`search-res-dj-container-item-left`}>
                  <img v-lazy={item?.picUrl} alt="" />
                  <span class={`ellipsis`}>{item.name}</span>
                </div>

                <div class={`search-res-dj-container-item-right`}>
                  <span>播放: {item?.playCount}</span>
                  <span>声音: {item?.programCount}</span>
                  <div>
                    <span>by</span>
                    <span
                      onClick={() => {
                        this.$router.push(`/user/${item.dj.userId}/detail`)
                      }}
                      class={`search-res-dj-container-item-right-name`}
                    >
                      {' '}
                      {item.dj?.nickname}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </>
    )
  }
})

export default SearchDj
