import { defineComponent, ref, reactive } from 'vue'
import Toast from '@/plugins/Toast'
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
    },
    total: {
      type: Number,
      default: 1
    }
  },
  emits: [
    'operateCommentLike',
    'sendComment',
    'operateReply',
    'paginationSizeChange',
    'paginationCurrentChange'
  ],
  setup(props, { emit }) {
    const reqParams = reactive({
      limit: 30,
      offset: 0,
      page: 1
    })
    const currentSelected = ref(0)
    const myselfId = ref(0)
    const content = ref('')
    const replyUser: any = ref(null)
    const replyItem = ref()
    const reply = (item?: any) => {
      if (replyUser.value === null) {
        const text = document.getElementById('comment')
        replyUser.value = '@ ' + item?.user.nickname + '      礼貌发言噢'
        text?.focus()
        replyItem.value = item
      } else {
        if (content.value !== '') {
          emit('operateReply', replyItem.value, content.value)
          replyUser.value = null
          content.value = ''
        } else {
          Toast('warning', '回复不能为空~')
        }
      }
    }

    return {
      currentSelected,
      content,
      myselfId,
      replyUser,
      reqParams,
      reply
    }
  },
  render() {
    return (
      <>
        {/* 评论内容 */}
        <div class="comment-send-container">
          <h1>评论</h1>
          <textarea
            v-model={this.content}
            placeholder={this.replyUser}
            name="comment"
            id="comment"
            cols={this.cols}
            rows="3"
          ></textarea>
          <el-button
            style={`display: block; margin-left: 15px;`}
            onMouseup={() => {
              if (this.replyUser === null) {
                const str = JSON.stringify(this.content)
                this.$emit('sendComment', JSON.parse(str))
                this.content = ''
              } else {
                this.reply()
              }
            }}
            type="primary"
          >
            发送
          </el-button>
        </div>
        {/* 选择 */}
        <div class="clearfix selected-comment-header">
          <h1
            onClick={() => {
              this.currentSelected = 0
            }}
            class={`${this.currentSelected === 0 ? 'active' : ''}`}
          >
            精彩评论
          </h1>
          <h1
            onClick={() => {
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
                        <div class={`comment-time-right`}>
                          <div>
                            <i
                              onClick={() =>
                                this.$emit('operateCommentLike', item)
                              }
                              class={`${
                                item.liked ? 'active' : ''
                              } l-dianzan iconfont`}
                            ></i>
                            <span key={item.liked}>{item.likedCount}</span>
                          </div>
                          <i
                            onClick={() => {
                              this.replyUser = null
                              this.reply(item)
                            }}
                            style={`margin-left: 10px`}
                            class={`iconfont l-huifu`}
                          ></i>
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
                        <div class={`comment-time-right`}>
                          <div>
                            <i
                              onClick={() =>
                                this.$emit('operateCommentLike', item)
                              }
                              class={`${
                                item.liked ? 'active' : ''
                              } l-dianzan iconfont`}
                            ></i>
                            <span key={item.liked}>{item.likedCount}</span>
                          </div>
                          <i
                            onClick={() => {
                              this.replyUser = null
                              this.reply(item)
                            }}
                            style={`margin-left: 10px`}
                            class={`iconfont l-huifu`}
                          ></i>
                        </div>
                      </div>
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
                  page-sizes={[30, 50, 70, 100]}
                  background
                  disable
                  layout="total,sizes, prev, pager, next, jumper"
                  total={this.total}
                  onSizeChange={() => {
                    this.reqParams.page = 1
                    this.$emit('paginationSizeChange', this.reqParams)
                  }}
                  onCurrentChange={() => {
                    this.$emit('paginationCurrentChange', this.reqParams)
                  }}
                />
              </div>
            ) : (
              ''
            )}
          </>
        )}
      </>
    )
  }
})

export default LComment
