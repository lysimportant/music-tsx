import { ref } from 'vue'
import dayjs from 'dayjs'
import { useIntersectionObserver } from '@vueuse/core'
export const playCountFormat = (count: number) => {
  if (count > 10000) {
    return (count / 10000).toFixed(0) + 'w'
  } else {
    return count
  }
}
export const playSongTime = (time: number) => {
  return dayjs(time).format('mm:ss')
}
/**
 *数据懒加载
 * @param { Object } target - DOM Object
 * @param { Function } apiFn - API 函数
 * */
export const useLazyData = (apiFn: Function) => {
  let result = ref([]) // 返回的数据存储
  const target = ref<InstanceType<typeof HTMLElement>>() // DOM元素的存储
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting 是否进入元素可视区
      if (isIntersecting) {
        stop()
        // API函数的调佣
        apiFn().then((res: any) => {
          result.value = res.result
        })
      }
    }
  )
  return { result, target }
}
