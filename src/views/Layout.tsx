import { defineComponent } from 'vue'
import LHeader from '@/components/l-header/l-header'
import { RouterView } from 'vue-router'
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
      </>
    )
  }
})

export default Layout
