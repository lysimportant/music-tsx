import {
  ElSlider,
  ElButton,
  ElTooltip,
  ElTable,
  ElTableColumn,
  ElSkeleton,
  ElPopover,
  ElPagination,
  ElBacktop,
  ElTabs,
  ElTabPane
} from 'element-plus'
// import 'element-plus/dist/index.css'
import type { App } from 'vue'
const components = [
  ElSlider,
  ElButton,
  ElTooltip,
  ElTable,
  ElTableColumn,
  ElSkeleton,
  ElPopover,
  ElPagination,
  ElBacktop,
  ElTabs,
  ElTabPane
]
export default function (app: App) {
  components.forEach(component => {
    app.component(component.name, component)
  })
}
