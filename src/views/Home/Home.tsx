import { defineComponent, Suspense } from 'vue'
import HBanner from './components/h-banner'
import HRecommend from './components/h-recommend'
const Home = defineComponent({
  name: 'Home',
  components: {
    HBanner,
    HRecommend
  },
  setup() {},
  render() {
    return (
      <>
       <div class="card">
       <Suspense>
          <HBanner></HBanner>
        </Suspense>
        <Suspense>
          <HRecommend></HRecommend>
        </Suspense>
       </div>
      </>
    )
  }
})

export default Home
