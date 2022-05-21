import { defineComponent } from 'vue'
import LMore from '@/components/l-more/l-more'
import LRecommend from '@/components/l-recommend/l-recommend'
import './style/h-recommend'
import { findRecommendSongList } from '@/api/home'
const HRecommend = defineComponent({
  name: "HRecommend",
  components: {
    LMore
  },
  async setup (props, { emit }) {
    const { result }: any = await findRecommendSongList()
    return {
      result
    }
  },
  render () {
    return <>
      <div class="h-recommend container">
      {/* v-slots={{ footer: () => 'footer'}} */}
        <LMore to='/song' title='推荐歌单'></LMore>
        <LRecommend list={this.result}></LRecommend>
      </div>
    </>
  }
})

export default HRecommend
