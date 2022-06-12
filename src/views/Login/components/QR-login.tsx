import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import {
  generateQR,
  generateQRKey,
  checkGenerateQR,
  findUserDetail,
  getUserDetail
} from '@/api/user'
import Toast from '@/plugins/Toast'
import { useUser } from '@/stores/user'
import '../style/QR'
const QRLogin = defineComponent({
  name: 'QRLogin',
  emits: ['qr-success'],
  setup(props, { emit }) {
    const UStore = useUser()
    const QRKey = ref()
    const QRImage = ref()
    const isExpired = ref(false)
    const getQR = async () => {
      const QRKey_ = await generateQRKey()
      QRKey.value = QRKey_.data.unikey
      const QR = await generateQR(QRKey.value)
      QRImage.value = QR.data.qrimg
    }
    let timer = null
    const checkQR = () => {
      timer = setInterval(async () => {
        const res = await checkGenerateQR(QRKey.value)
        console.log(res)
        if (res.code === 800) {
          Toast('warning', res.message)
          isExpired.value = true
          clearInterval(timer)
        }
        if (res.code === 803) {
          clearInterval(timer)
          UStore.profile.cookie = res.cookie
          const resUS = await getUserDetail()
          UStore.profile = resUS
          if (resUS.code === 200) {
            const resDe = await findUserDetail(resUS.account.id)
            UStore.userDetail = resDe
            console.log('QRQRQRQRQR', UStore.userDetail, resDe)
            emit('qr-success')
            return Toast('success', res.message)
          }
        }
      }, 1500)
    }
    onMounted(() => {
      clearInterval(timer)
      getQR()
      checkQR()
    })
    onUnmounted(() => {
      clearInterval(timer)
    })
    const resetQR = () => {
      isExpired.value = false
      getQR()
      checkQR()
    }
    return {
      QRImage,
      isExpired,
      resetQR
    }
  },
  render() {
    return (
      <div class={`QR`}>
        <h1 class={`QRImg`}>
          <img src={this.QRImage} alt="" />
        </h1>
        <div class={`QRText`}>
          {this.isExpired ? (
            <div class={`resetQR`} onClick={() => this.resetQR()}>
              <i>点击刷新二维码</i>
            </div>
          ) : (
            ''
          )}
          <span style={`font-size: 20px;`}>
            请使用 <i style={`color: skyblue;`}>网易云音乐App</i> 扫码登录
          </span>
        </div>
      </div>
    )
  }
})

export default QRLogin
