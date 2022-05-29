import { defineComponent , ref} from 'vue'
import { findLeaderBoardDetail } from '@/api/leaderboard'
import LRecommend from '@/components/l-recommend/l-recommend'
import './style'
const LeaderBoard = defineComponent({
  name: "LeaderBoard",
  setup (props, { emit }) {
    const officialLeaderBoaedList = ref([])
    const globalLeaderBoardList = ref([])
    findLeaderBoardDetail().then((res) => {
      officialLeaderBoaedList.value = res.list.splice(0,4)
      globalLeaderBoardList.value = res.list
      console.log(officialLeaderBoaedList.value)
    })
    return {
      officialLeaderBoaedList,
      globalLeaderBoardList
    }
  },
  render () {
    return <div class={`card`}>
      <h1>官方榜</h1>
      <div class="official-container">
        <div class={`left`}><img src={this.officialLeaderBoaedList[0]?.coverImgUrl} alt="" /></div>
        <div class={`right`}>231231232</div>
      </div>
      <h1>全球榜</h1>
      <LRecommend list={this.globalLeaderBoardList}></LRecommend>
    </div>
  }
})

export default LeaderBoard
