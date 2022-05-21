import { defineComponent, Suspense } from 'vue'
import HBanner from './components/h-banner'
import HRecommend from './components/h-recommend'
import HNewSong from './components/h-newsong'
const Home = defineComponent({
  name: 'Home',
  components: {
    HBanner,
    HRecommend,
    HNewSong
  },
  setup() {},
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
