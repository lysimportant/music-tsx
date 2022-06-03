import { defineComponent, reactive, ref, watch } from 'vue'
import SingerDetailMV from '../SingerDetail/components/SingerDetailMV'
import { typeArr, areaArr, orderArr } from './config'
import { findAllMV } from '@/api/mv'
import './style'
const MV = defineComponent({
  name: 'MV',
  setup(props, { emit }) {
    const reqParams = reactive({
      order: '上升最快',
      area: '全部',
      limit: 40,
      offset: 0,
      type: '全部',
      page: 1
    })

    const mvList = ref([])
    const getAllMV = async () => {
      reqParams.offset = (reqParams.page - 1) * reqParams.limit
      // 获取歌单
      const res = await findAllMV(reqParams)
      console.log(res)
      mvList.value = res.data
    }
    watch(
      () => reqParams,
      e => {
        getAllMV()
      },
      { immediate: true, deep: true }
    )
    return {
      reqParams,
      mvList,
      typeArr,
      areaArr,
      orderArr
    }
  },
  render() {
    return (
      <div class={`card`}>
        <div class={`mv-selected-container`}>
          <div class="mv-selected-container-area">
            <ul>
              <li style={`font-size: 18px;`}>地区: </li>
              {this.areaArr.map(initial => {
                return (
                  <li
                    onClick={() => {
                      this.reqParams.area = initial
                    }}
                    class={`${this.reqParams.area === initial ? 'active' : ''}`}
                  >
                    {initial}
                  </li>
                )
              })}
            </ul>
          </div>
          <div class="mv-selected-container-type">
            <ul>
              <li style={`font-size: 18px;`}>类型: </li>
              {this.typeArr.map(initial => {
                return (
                  <li
                    onClick={() => {
                      this.reqParams.type = initial
                    }}
                    class={`${this.reqParams.type === initial ? 'active' : ''}`}
                  >
                    {initial}
                  </li>
                )
              })}
            </ul>
          </div>
          <div class="mv-selected-container-order">
            <ul>
              <li style={`font-size: 18px;`}>类型: </li>
              {this.orderArr.map(initial => {
                return (
                  <li
                    onClick={() => {
                      this.reqParams.order = initial
                    }}
                    class={`${
                      this.reqParams.order === initial ? 'active' : ''
                    }`}
                  >
                    {initial}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div class="mv">
          <SingerDetailMV mv={this.mvList}></SingerDetailMV>
        </div>
        <div class="pagenaintaion">
          <el-pagination
            v-model:currentPage={this.reqParams.page}
            v-model:page-size={this.reqParams.limit}
            page-sizes={[40, 60, 80, 100]}
            background
            disable
            layout="sizes, prev, pager, next, jumper"
            total={1000}
          />
        </div>
      </div>
    )
  }
})

export default MV
