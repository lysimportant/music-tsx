export default function Toast(type: string, text: string) {
  const div = document.createElement('div')
  div.setAttribute('class', 'my-toast'+new Date())
  const MessageType = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    INFO: 'info'
  }
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
  div.innerHTML = text
  timer && clearTimeout(timer)
  document.body.append(div)
  timer = setTimeout(() => {
    document.body.removeChild(div)
  }, 3000)
}
