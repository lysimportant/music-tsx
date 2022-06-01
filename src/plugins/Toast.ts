const div = document.createElement('div')
div.setAttribute('class', 'my-toast')
const MessageType = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info'
}
export default function Toast(type: string, text: string) {
  let timer = null
  // 添加元素
  switch (type) {
    case MessageType.SUCCESS:
      div.setAttribute('class', 'my-toast my-toast-success')
      break
    case MessageType.ERROR:
      div.setAttribute('class', 'my-toast my-toast-error')
      break
    case MessageType.INFO:
      div.setAttribute('class', 'my-toast my-toast-info')
      break
    case MessageType.WARNING:
      div.setAttribute('class', 'my-toast my-toast-warning')
      break
  }
  document.body.append(div)
  div.innerHTML = text
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    document.body.removeChild(div)
  }, 3000)
}
