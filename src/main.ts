import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import App from './App.vue'
import router from './router'
import registerDirective from './plugins/registerDirective'
import { reset } from '@/plugins/screen-adaptation'
import registerComponents from './plugins/registerComponents'
import './plugins/bg'
reset()
// app的创建
const app = createApp(App)
registerComponents(app)
// window.localStorage.removeItem('pinia-useMusic')
// app.use(ElementPlus)
// 设置显示
// window.sessionStorage.setItem('show-detail', JSON.stringify(true))
// 集中式状态管理 pinia
const pinia = createPinia()
app.use(registerDirective)
// pinia 使用 持久化插件
pinia.use(createPersistedState())
// 注册 pinia
app.use(pinia)

// 注入Rotuer
app.use(router)
// 挂载 app
app.mount('#app')
