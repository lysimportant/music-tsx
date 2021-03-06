import { defineComponent, Suspense, ref } from 'vue'
import HBanner from './components/h-banner'
import HRecommend from './components/h-recommend'
import HNewSong from './components/h-newsong'
import HRecommendMV from './components/h-recommend-mv'
const Home = defineComponent({
  name: 'Home',
  components: {
    HBanner,
    HRecommend,
    HNewSong
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
        <Suspense>
          <HRecommendMV></HRecommendMV>
        </Suspense>
      </div>
    )
  }
})

export default Home
