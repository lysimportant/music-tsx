import { defineComponent } from 'vue'
const LCarouselItem = defineComponent({
  name: 'LCarouselItem',
  props: {
    imgUrl: {
      type: String,
      default: ''
    }
  },
  render() {
    return (
      <>
        <img src={this.imgUrl} alt="" />
      </>
    )
  }
})

export default LCarouselItem
