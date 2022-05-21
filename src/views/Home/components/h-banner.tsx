import { defineComponent } from 'vue'
import LCarousel from '@/library/l-carousel/l-carousel'
import LCarouselItem from '@/library/l-carousel-item/l-carousel-item'
import { findBanner } from '@/api/home'
const HBanner = defineComponent({
  name: 'HBanner',
  components: {
    LCarousel,
    LCarouselItem
  },
  async setup() {
    // 获取轮播图数据
    const { banners }: any = await findBanner()
    return {
      banners
    }
  },
  render() {
    return (
      <LCarousel autoPlay height={500} width={200}>
        {this.banners.map((item: any, index: number) => {
          return <LCarouselItem imgUrl={item.imageUrl}></LCarouselItem>
        })}
      </LCarousel>
    )
  }
})

export default HBanner
