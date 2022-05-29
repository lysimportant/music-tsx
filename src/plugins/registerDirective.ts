import type { App } from 'vue'
import defaultImage from '@/assets/image/logo.png'
export default {
  install(app: App) {
    app.directive('lazy', {
      mounted(el, { value }) {
        const observer = new IntersectionObserver(
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              observer.unobserve(el)
              el.onerror = () => {
                // 加载失败，设置默认图
                console.log(defaultImage, 'defaultImage')
                el.src = defaultImage
              }
              el.src = value
            }
          },
          { threshold: 0 }
        )
        observer.observe(el)
      }
    })
  }
}
