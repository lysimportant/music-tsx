import { defineComponent, ref } from 'vue'
import LMore from '@/components/l-more/l-more'
import { findRecommenfMV } from '@/api/home'
import { playCountFormat } from '@/hooks'
import './style/h-re-mv'
const HRecommendMV = defineComponent({
  name: 'HRecommendMV',
  setup(props, { emit }) {
    const mvs = ref()
    const getMV = async () => {
      const res = await findRecommenfMV()
      mvs.value = res!.result
    }
    getMV()
    return {
      mvs
    }
  },
  render() {
    return (
      <div class={`container `}>
        <LMore title="推荐MV" to="/mv"></LMore>
        <div class="mv-recommend clearfix">
          {this.mvs?.map(item => {
            return (
              <div
                onClick={() => this.$router.push(`/mvdetail/${item.id}`)}
                class="mv-recommend-item"
              >
                <img v-lazy={item.picUrl} alt="" />
                <div class={`ellipsis`}>{item.name}</div>
                <span class={`ellipsis`}>{item.artistName}</span>
                <i class={`mv-d-con`}>
                  {' '}
                  <i class={`l-24gl-play iconfont`}></i>
                  {playCountFormat(item.playCount)}
                </i>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
})

export default HRecommendMV
