import ElementPlus, {
  ElSlider,
  ElButton,
  ElTooltip,
  ElTable,
  ElTableColumn,
  ElSkeleton,
  ElPopover,
  ElPagination,
  ElBacktop,
} from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
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
  ElBacktop
]
export default function (app: App) {
  components.forEach(component => {
    app.component(component.name, component)
  })
}
