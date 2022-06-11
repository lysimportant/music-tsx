import { defineComponent, reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { useIntervalFn } from '@vueuse/core'
import {
  sendCaptcha,
  verifyUserCaptcha,
  getUserDetail,
  findUserDetail
} from '@/api/user'
import { useUser } from '@/stores/user'
import { rules } from './config'
import Toast from '@/plugins/Toast'
const PhoneLogin = defineComponent({
  name: 'PhoneLogin',
  emits: ['phone-success'],
  setup(props, { emit }) {
    const UStore = useUser()
    const isDisabled = ref(false)
    const PhoneForm = reactive({
      phone: '',
      captcha: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    // 倒计时数据
    const captchaTime = ref(0)
    // 倒计时实现
    const { pause, resume, isActive } = useIntervalFn(
      () => {
        /* your function */
        if (captchaTime.value === 0) {
          pause()
          isDisabled.value = false
        }
        captchaTime.value--
      },
      1000,
      { immediate: false }
    )
    // 验证 验证码是否正确
    const verifyCaptcha = () => {
      formRef.value?.validate(async valid => {
        if (!valid) return
        const res = await verifyUserCaptcha(PhoneForm)
        console.log(res)
        UStore.userDetail = res
        if (res?.code === 200) {
          Toast('success', '登录成功!')
          // UStore.profile = res
          // return emit('phone-success')
        }
      })
    }
    // 获取验证码
    const getCaptcha = async () => {
      const reg = new RegExp(/^1[3|5|7|]\d{9}$/)
      if (!reg.test(PhoneForm.phone)) {
        return Toast('warning', '亲, 请输入正确的手机号码')
      }
      isDisabled.value = true
      captchaTime.value = 60
      resume()
      await sendCaptcha(PhoneForm.phone)
    }
    return {
      PhoneForm,
      isDisabled,
      captchaTime,
      isActive,
      formRef,
      verifyCaptcha,
      getCaptcha
    }
  },
  render() {
    return (
      <div class={`login-form-container`}>
        <el-form rules={rules} ref={'formRef'} model={this.PhoneForm}>
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model={this.PhoneForm.phone}
              placeholder="请输入您的手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <el-input
              style={`width: 50%; margin-right: 5px;`}
              v-model={this.PhoneForm.captcha}
              clearable
              placeholder="请输入验证码"
            ></el-input>
            <el-button
              disabled={this.isDisabled}
              onClick={() => this.getCaptcha()}
            >
              {this.isActive ? `${this.captchaTime}s后获取` : '获取验证码'}
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" onClick={() => this.verifyCaptcha()}>
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    )
  }
})

export default PhoneLogin
