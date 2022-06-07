import { defineComponent, reactive } from 'vue'
import './style'
const Subscribers = defineComponent({
  name: 'Subscribers',
  props: {
    subscribers: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 1
    }
  },
  emits: ['paginationHobbySizeChange', 'paginationHobbyCurrentChange'],
  setup(props, { emit }) {
    const reqParams = reactive({
      limit: 40,
      offset: 0,
      page: 1
    })
    return {
      reqParams
    }
  },
  render() {
    return (
      <>
        <div class={`subs-container`}>
          {this.subscribers?.map((item: any) => {
            return (
              <div class={`subs-container-item`}>
                <img src={item?.avatarUrl} alt="" />
                <div class={`subs-container-item-info`}>
                  <span class={`name`}>
                    {item.nickname}
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
                  </span>
                  {item.signature ? (
                    <span class={`ellipsis-2 sign`}>{item.signature}</span>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            )
          })}
        </div>
        {this.total > 1 ? (
          <div class="pagenaintaion">
            <el-pagination
              v-model:currentPage={this.reqParams.page}
              v-model:page-size={this.reqParams.limit}
              page-sizes={[40, 60, 80, 100]}
              background
              disable
              layout="sizes, prev, pager, next, jumper"
              total={this.total}
              onSizeChange={() => {
                this.reqParams.page = 1
                this.$emit('paginationHobbySizeChange', this.reqParams)
              }}
              onCurrentChange={() => {
                this.$emit('paginationHobbyCurrentChange', this.reqParams)
              }}
            />
          </div>
        ) : (
          ''
        )}
      </>
    )
  }
})

export default Subscribers
