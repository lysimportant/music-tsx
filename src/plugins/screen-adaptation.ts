import { ref } from 'vue'
const html = document.querySelector('html') as HTMLHtmlElement
let pc_andorid: any = ref(null)
function reset() {
  console.log('hooks 成功了')
  var clientWidth = html.clientWidth
  if (!clientWidth) return
  if (clientWidth >= 850) {
    html.style.fontSize = '50px'
    pc_andorid.value = true
  } else {
    html.style.fontSize = '36px'

    pc_andorid.value = false
  }
  if (pc_andorid.value) {
    import('@/assets/style/index.css')
  } else {
    // window.location.href = "https://www.lianghj.top"
  }
}
window.onresize = function () {
  reset()
}
export { reset }
