import { defineComponent, ref, watch } from 'vue'
import './style'
const LComment = defineComponent({
  name: 'LComment',
  props: {
    comment: {
      type: Array,
      default: () => []
    },
    hotComment: {
      type: Array,
      default: () => []
    },
    cols: {
      type: Number,
      default: 79
    }
  },
  emits: ['operateCommentLike'],
  setup(props, { emit }) {
    const currentSelected = ref(0)
    const currentComment: any = ref([])
    return {
      currentSelected,
      currentComment
    }
  },
  render() {
    return (
      <>
        {/* 评论内容 */}
        <div class="comment-send-container">
          <h1>评论</h1>
          <textarea
            name="comment"
            id="comment"
            cols={this.cols}
            rows="6"
          ></textarea>
        </div>
        {/* 选择 */}
        <div class="clearfix selected-comment-header">
          <h1
            onClick={() => {
              this.currentComment = this.$props.hotComment
              this.currentSelected = 0
            }}
            class={`${this.currentSelected === 0 ? 'active' : ''}`}
          >
            精彩评论
          </h1>
          <h1
            onClick={() => {
              this.currentComment = this.$props.comment
              this.currentSelected = 1
            }}
            class={`${this.currentSelected === 1 ? 'active' : ''}`}
          >
            最新评论
          </h1>
          {/* 排序 */}
          {/* <div>1</div> */}
        </div>
        {this.currentSelected === 0 ? (
          <>
            {/* 热门评论区 */}
            <div class={`comment-container`}>
              {this.$props.hotComment?.map((item: any) => {
                return (
                  <div class="comment-container-item clearfix">
                    <div class={`comment-container-item-left`}>
                      <img src={item?.user.avatarUrl} alt="" />
                    </div>
                    {/* 中间 */}
                    <div class={`comment-container-item-center`}>
                      <div class={`comment-name`}>
                        <span class={`active`}>{item?.user.nickname}</span>:
                        <i>{item?.content}</i>
                      </div>
                      {item?.beReplied.length ? (
                        <div class={`beReplied`}>
                          {item?.beReplied.map(item => {
                            return (
                              <>
                                <span class={`active`}>
                                  @{item.user.nickname}
                                </span>
                                : <i>{item.content}</i>
                              </>
                            )
                          })}
                        </div>
                      ) : (
                        ''
                      )}

                      <div class={`comment-time`}>
                        <div>{item?.timeStr}</div>
                        <div
                          onClick={() => this.$emit('operateCommentLike', item)}
                          class={`comment-time-right`}
                        >
                          <i
                            class={`${
                              item.liked ? 'active' : ''
                            } l-dianzan iconfont`}
                          ></i>
                          <span key={item.liked}>{item.likedCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <>
            {/* 最新评论区 */}
            <div class={`comment-container`}>
              {this.$props.comment?.map((item: any) => {
                return (
                  <div class="comment-container-item clearfix">
                    <div class={`comment-container-item-left`}>
                      <img src={item?.user.avatarUrl} alt="" />
                    </div>
                    {/* 中间 */}
                    <div class={`comment-container-item-center`}>
                      <div class={`comment-name`}>
                        <span class={`active`}>{item?.user.nickname}</span>:
                        <i>{item?.content}</i>
                      </div>
                      {item?.beReplied.length ? (
                        <div class={`beReplied`}>
                          {item?.beReplied.map(item => {
                            return (
                              <>
                                <span class={`active`}>
                                  @{item.user.nickname}
                                </span>
                                : <i>{item.content}</i>
                              </>
                            )
                          })}
                        </div>
                      ) : (
                        ''
                      )}

                      <div class={`comment-time`}>
                        <div>{item?.timeStr}</div>
                        <div
                          onClick={() => this.$emit('operateCommentLike', item)}
                          class={`comment-time-right`}
                        >
                          <i
                            class={`${
                              item.liked ? 'active' : ''
                            } l-dianzan iconfont`}
                          ></i>
                          <span key={item.liked}>{item.likedCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </>
    )
  }
})

export default LComment
