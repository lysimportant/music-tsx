import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findArtistDesc } from '@/api/singer'
import '../style/singer-detail-desc'
const SingerDetailDesc = defineComponent({
  name: 'SingerDetailDesc',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const route = useRoute()
    const singerData = ref()
    watch(
      () => route.params.id,
      async () => {
        const res = await findArtistDesc(route.params.id as string)
        singerData.value = res
      },
      { immediate: true }
    )
    return {
      singerData
    }
  },
  render() {
    return (
      <>
        <h1>{this.name}简介</h1>
        <span class={`desc`}>{this.singerData?.briefDesc}</span>
        {this.singerData?.introduction.map(item => {
          return (
            <>
              <h1>{item.ti}</h1>
              <pre>{item.txt}</pre>
            </>
          )
        })}
      </>
    )
  }
})

export default SingerDetailDesc
