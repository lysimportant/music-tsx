import { defineComponent, onMounted, ref } from 'vue'
import imgUrl from '@/assets/image/feishu.png'
import QQUrl from '@/assets/image/程序学习交流群聊二维码.png'

const HeaderDialog = defineComponent({
  name: 'HeaderDialog',
  setup(props, { emit, expose }) {
    const activeName = ref('other')
    const show_detail = ref(true)
    const show = () => {
      show_detail.value = !show_detail.value
    }
    expose({
      show
    })

    return {
      activeName,
      show_detail,
      show
    }
  },
  render() {
    return (
      <el-dialog v-model={this.show_detail} width="70%">
        项目还没有完成! 全部播放有的歌单过于多,请求不了 没有请求所有全部,只是部分
        <el-tabs v-model={this.activeName}>
          <el-tab-pane label="其它" name="other">
            <ul class={`other-detail`}>
              <li>
                <h2>仓库地址:</h2>
                <li>
                  <a href="https://github.com/lysimportant" target="__blank">
                    <span style="color: deeppink; ">github:</span>{' '}
                    https://github.com/lysimportant
                  </a>
                </li>
                <li>
                  <a href="https://gitee.com/lysimportant" target="__blank">
                    <span style="color: pink; ">gitee:</span>{' '}
                    https://gitee.com/lysimportant
                  </a>
                </li>
              </li>
              <li>
                <h2>博客:</h2>
                <li>
                  <a
                    href="https://blog.csdn.net/weixin_46858768?type=blog"
                    target="__blank"
                  >
                    <span>CSDN: </span>{' '}
                    https://blog.csdn.net/weixin_46858768?type=blog
                  </a>
                </li>
              </li>
              <li>
                <h2>以前项目:</h2>
                <li>
                  <a href="http://admin.lianghj.top/#/login" target="__blank">
                    <span>电商后台管理系统: </span>
                    http://admin.lianghj.top
                  </a>
                </li>
                <li>
                  <a href="http://xtx.lianghj.top/#/" target="__blank">
                    <span>小兔鲜电商项目: </span> http://xtx.lianghj.top
                  </a>
                </li>
                <li>
                  <a href="http://shop.lianghj.top/#/" target="__blank">
                    <span>pink品邮购商城: </span> http://shop.lianghj.top
                  </a>
                </li>
                <li>
                  <a href="http://music.lianghj.top/#/" target="__blank">
                    <span>旧版 Music: </span> http://music.lianghj.top
                  </a>
                </li>
                <li>
                  <a href="http://mall.lianghj.top/#/" target="__blank">
                    <span>coderwhy 蘑菇街: </span> http://mall.lianghj.top
                  </a>
                </li>
              </li>
              <li>
                <h2>交流学习</h2>
                <li style={`padding: 0;`} class={`xx`}>
                  <img title="飞书" style={`width: 100%`} src={imgUrl} alt="" />
                  <a
                    href="https://jq.qq.com/?_wv=1027&k=Dnui5P9V"
                    target="__blank"
                  >
                    <img title="QQ" src={QQUrl} alt="" />
                  </a>
                </li>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="本项目" name="sourceCode">
            <ul class={`project-detail`}>
              <li>
                <h2>功能</h2>
                <li>帐号登录</li>
                <li>扫码登录</li>
                <li>关注用户</li>
                <li>收藏歌手</li>
                <li>收藏歌曲</li>
                <li>发送评论</li>
                <li>回复评论</li>
                <li>评论点赞</li>
                <li>搜索/帐号登录 enter键 </li>
                <li>播放 space键</li>
                <li>个人信息 粉丝列表 关注列表</li>
                <li>评论组件 </li>
                <li>轮播图的封装</li>
                <li>推荐组件等封装</li>
                <li>专辑页面</li>
                <li>歌单/歌单详情页面</li>
                <li>歌手详情页面</li>
                <li>页面间切换</li>
                <li>.........</li>
                <li style={`color: pink;`}>播放器还没有使用插件...</li>
                <li>....</li>
              </li>
              <li>
                <h2>技术</h2>
                <li>Vue3 Tsx - Vue-Router </li>
                <li>Pinia - 持久化插件</li>
                <li>axios</li>
                <li>element-plus</li>
                <li>@vueuse/core</li>
                <li>dayjs</li>
                <li>....</li>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    )
  }
})

export default HeaderDialog
