import { defineComponent, ref } from 'vue'
import './style'
const LInput = defineComponent({
  name: 'LInput',
  props: {
    modelValue: {
      type: [String],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    active: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'changeInput'],
  setup(props, { emit }) {
    //  input的节点
    const LInputRef = ref<InstanceType<typeof HTMLInputElement>>()
    //  active 样式标识
    const activeInput = ref(false)
    //  eye 标识
    const eyeFlag = ref(true)
    //  双向绑定数据
    const inputChange = (val?: string) => {
      emit('changeInput')
      emit('update:modelValue', val)
    }
    //  清除输入框的值并获取其输入框的焦点
    const clearClick = () => {
      LInputRef.value?.focus()
      emit('update:modelValue', '')
    }
    return {
      inputChange,
      clearClick,
      activeInput,
      LInputRef,
      eyeFlag
    }
  },
  render() {
    return (
      <>
        <input
          ref="LInputRef"
          type={
            this.eyeFlag
              ? this.type === 'password'
                ? 'password'
                : 'text'
              : 'text'
          }
          onFocus={() => {
            this.activeInput = true
          }}
          onBlur={() => {
            this.activeInput = false
          }}
          placeholder={this.placeholder}
          class={`l-input ${
            this.active && this.activeInput ? 'l-input-active' : ''
          }`}
          onInput={($event: any) => this.inputChange($event.target!.value)}
          value={this.modelValue}
        ></input>
        {this.clearable && this.modelValue!.length ? (
          <i
            onClick={() => this.clearClick()}
            class="iconfont l-quxiao search-clear"
          ></i>
        ) : (
          ''
        )}
        {this.showPassword && this.modelValue!.length ? (
          this.eyeFlag ? (
            <i
              onClick={() => (this.eyeFlag = !this.eyeFlag)}
              class={`iconfont l-yanjing show-eye ${
                this.clearable ? 'show-eye-left' : ''
              }`}
            ></i>
          ) : (
            <i
              onClick={() => (this.eyeFlag = !this.eyeFlag)}
              class={`iconfont l-bukejian show-eye ${
                this.clearable ? 'show-eye-left' : ''
              }`}
            ></i>
          )
        ) : (
          ''
        )}
      </>
    )
  }
})

export default LInput
