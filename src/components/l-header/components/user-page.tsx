import { defineComponent } from 'vue'
import { timeFormat } from '@/hooks'
const UserPage = defineComponent({
  name: 'UserPage',
  props: {
    profile: {
      type: Object,
      default: () => ({})
    },
    userDetail: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['login', 'logout'],
  setup(props, { emit }) {},
  render() {
    return <></>
  }
})

export default UserPage
