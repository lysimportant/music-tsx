import { defineComponent } from 'vue'
import LHeader from '@/components/l-header/l-header'
import { RouterView } from 'vue-router'
import { useUser } from '@/stores/user'
const Layout = defineComponent({
  name: 'Layout',
  setup() {},
  render: function () {
    return (
      <>
        <div class="app-header">
          <LHeader></LHeader>
        </div>
        <div class="app-body clearfix">
          <RouterView></RouterView>
        </div>
        <el-backtop visibility-height={450} bottom={100}>
          <div
            style={`
      height: 100%;
        width: 100%;
        background-color: #fff;
        box-shadow: 5px 0 8px rgba(0,0,0,.45);
        text-align: center;
        line-height: 40px;
        transform: rotate(90deg);
        color: #1989fa;`}
          >
            <i class={`iconfont l-31fanhui1`}></i>
          </div>
        </el-backtop>
      </>
    )
  }
})

export default Layout
