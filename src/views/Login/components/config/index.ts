export const rules = {
  phone: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('手机号码不能为空,请输入'))
        }
        const regMobile =
          /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        if (regMobile.test(value)) {
          // 合法的手机号
          return callback()
        }
        callback(new Error('请输入合法的手机号'))
      }
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('密码不能为空,请输入密码!'))
        }
        return callback()
      }
    }
  ],
  captcha: [
    { required: true, message: '亲, 验证码不能为空', trigger: 'blur' },
    { min: 4, max: 4, message: '请输入正确的4位验证码', trigger: 'blur' }
  ]
}
