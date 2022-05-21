import { defineComponent, Suspense } from 'vue'
import HBanner from './components/h-banner'
const Home = defineComponent({
  name: 'Home',
  components: {
    HBanner
  },
  setup() {},
  render() {
    return (
      <>
        <Suspense>
          <HBanner></HBanner>
        </Suspense>
      </>
    )
  }
})

export default Home
