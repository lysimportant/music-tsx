import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { arr } from '../config'
const HeaderPag = defineComponent({
  name: 'HeaderPag',
  setup(props, { emit }) {
    return {}
  },
  render() {
    return (
      <>
        <el-popover placement="right-start" width={800} trigger="hover">
          {{
            reference: () => {
              return (
                <el-button type="primary" style={`font-size: 20px;`}>
                  当前位置:{' '}
                  {arr.map((item, index) => {
                    if (
                      item.path === this.$route.path &&
                      !this.$route.params.comment
                    ) {
                      return (
                        <span style={`margin: 0 10px; color:  pink`}>
                          {item.name}
                        </span>
                      )
                    } else {
                      if (this.$route.params.comment) {
                        return index == 0 ? (
                          <span style={`margin: 0 10px; color:  pink`}>
                            搜索
                          </span>
                        ) : (
                          ''
                        )
                      }
                      const reg = /\/songlist\/\d*\/detail$/g
                      if (reg.test(this.$route.fullPath)) {
                        return index == 0 ? (
                          <span style={`margin: 0 10px; color:  pink`}>
                            歌单详情
                          </span>
                        ) : (
                          ''
                        )
                      }
                      const reg1 = /\/use/g
                      if (reg1.test(this.$route.fullPath)) {
                        return index == 0 ? (
                          <span style={`margin: 0 10px; color:  pink`}>
                            用户信息
                          </span>
                        ) : (
                          ''
                        )
                      }
                      const reg2 = /\/singerdetail/g
                      if (reg2.test(this.$route.fullPath)) {
                        return index == 0 ? (
                          <span style={`margin: 0 10px; color:  pink`}>
                            歌手详情
                          </span>
                        ) : (
                          ''
                        )
                      }
                      const reg3 = /\/album\/\d*\/detail$/g
                      if (reg3.test(this.$route.fullPath)) {
                        return index == 0 ? (
                          <span style={`margin: 0 10px; color:  pink`}>
                            专辑详情
                          </span>
                        ) : (
                          ''
                        )
                      }
                      const reg4 = /\/lrc/g
                      if (reg4.test(this.$route.fullPath)) {
                        return index == 0 ? (
                          <span style={`margin: 0 10px; color:  pink`}>
                            歌词
                          </span>
                        ) : (
                          ''
                        )
                      }
                    }
                  })}
                </el-button>
              )
            },
            default: () => {
              return (
                <ul class={`header-ul`}>
                  {/* 渲染列表 */}
                  {arr.map(item => {
                    return (
                      <li>
                        <RouterLink
                          class={`${
                            this.$route.path === item.path ? 'active' : ''
                          }`}
                          to={item.path}
                        >
                          <el-button>{item.name}</el-button>
                        </RouterLink>
                      </li>
                    )
                  })}
                </ul>
              )
            }
          }}
        </el-popover>
      </>
    )
  }
})

export default HeaderPag
