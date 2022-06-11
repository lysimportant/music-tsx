import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { login, findUserDetail } from '@/api/user'
import { rules } from './config'
import Toast from '@/plugins/Toast'
import { useUser } from '@/stores/user'
const AccountLogin = defineComponent({
  name: 'AccountLogin',
  emits: ['account-success'],
  setup(props, { emit }) {
    const UStore = useUser()
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginPhoneForm = reactive({
      phone: '',
      password: ''
    })
    let event = el => {
      console.log(el)
      if (el.key === 'Enter') {
        AccountLogin()
      }
    }
    onMounted(() => {
      document.addEventListener('keyup', event)
      console.log('绑定事件', event)
    })
    onUnmounted(() => {
      document.removeEventListener('keyup', event)
      console.log('解除事件', event)
    })
    const AccountLogin = () => {
      formRef.value?.validate(async valid => {
        if (!valid) return
        const res = await login(loginPhoneForm)
        console.log(res)
        if (res?.code === 502) {
          return Toast('error', res.msg)
        }
        if (res?.code === 200) {
          Toast('success', '登录成功!')
          UStore.userDetail = await findUserDetail(res?.profile?.userId)
          UStore.profile = res
          return emit('account-success')
        }
      })
    }
    return {
      loginPhoneForm,
      formRef,
      AccountLogin
    }
  },
  render() {
    return (
      <div class={`login-form-container`}>
        <el-form ref={'formRef'} rules={rules} model={this.loginPhoneForm}>
          <el-form-item label="帐号" prop="phone">
            <el-input
              v-model={this.loginPhoneForm.phone}
              placeholder="请输入您的手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              showPassword
              v-model={this.loginPhoneForm.password}
              clearable
              placeholder="请输入您的登录密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" onClick={() => this.AccountLogin()}>
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    )
  }
})

export default AccountLogin
