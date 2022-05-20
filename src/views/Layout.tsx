import { defineComponent } from 'vue'
import LHeader from '@/components/l-header/l-header'
const Layout = defineComponent({
  name: 'Layout',
  setup() {},
  render: function () {
    return (
      <>
        <div class="app-header">
          <LHeader></LHeader>
        </div>
        <div class="app-body container"></div>
      </>
    )
  }
})

export default Layout
