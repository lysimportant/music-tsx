import { defineComponent, watch, ref } from 'vue'
import { useMusic } from '@/stores/music'
import LMusic from '@/library/l-music/l-music'
export default defineComponent({
  name: 'Music',
  components: {
    LMusic
  },
  setup() {
    const store = useMusic()
    const audio = ref()
    watch(
      () => store.list,
      () => {
        audio.value = store.list
      },
      { immediate: true }
    )
    return {
      audio
    }
  },
  render() {
    return (
      <>
        <LMusic audio={this.audio}></LMusic>
      </>
    )
  }
})
