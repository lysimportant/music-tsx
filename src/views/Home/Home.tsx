import { defineComponent, Suspense, ref } from 'vue'
import HBanner from './components/h-banner'
import HRecommend from './components/h-recommend'
import HNewSong from './components/h-newsong'
import lSilder from '@/library/l-slider/l-silder'
const Home = defineComponent({
  name: 'Home',
  components: {
    HBanner,
    HRecommend,
    HNewSong,
    lSilder
  },
  setup() {
    const val = ref(0)
    return {
      val
    }
  },
  render() {
    return (
      <div class="card">
        <Suspense>
          <HBanner></HBanner>
        </Suspense>
        <Suspense>
          <HRecommend></HRecommend>
        </Suspense>
        <Suspense>
          <HNewSong></HNewSong>
        </Suspense>
      </div>
    )
  }
})

export default Home
