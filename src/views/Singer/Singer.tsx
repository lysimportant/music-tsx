import { defineComponent, reactive, watch, ref } from 'vue'
import { findArtist } from '@/api/singer'
import type { ArtistType } from '@/api/singer'
import LRecommend from '@/components/l-recommend/l-recommend'
import { singerAreaArr, singerInitialArr, singerTypeArr } from './config'
import './style'
const Singer = defineComponent({
  name: 'Singer',
  setup(props, { emit }) {
    // 歌手的数组
    const artists = ref([])
    // 请求数据体
    const reqParams: ArtistType = reactive({
      limit: 20,
      offset: 0,
      type: -1,
      area: -1,
      initial: -1,
      page: 1
    })
    // 请求数据函数
    const getArtistList = async () => {
      reqParams.offset = (reqParams.page - 1) * reqParams.limit
      const res = await findArtist(reqParams)
      artists.value = res.artists
    }
    // 监测数据体的变化重新请求数据
    watch(
      () => reqParams,
      () => {
        getArtistList()
      },
      { immediate: true, deep: true }
    )
    return {
      artists,
      singerAreaArr,
      singerInitialArr,
      singerTypeArr,
      reqParams
    }
  },
  render() {
    return (
      <section class={`card`}>
        <div class="select-singer-type">
          <div class={`select-singer-type-singer`}>
            <ul>
              <li style={`font-size: 18px;`}>歌手: </li>
              {this.singerTypeArr.map(singer => {
                return (
                  <li
                    onClick={() => {
                      ;(this.reqParams.type = singer.type),
                        (this.reqParams.page = 1)
                    }}
                    class={`${
                      this.reqParams.type === singer.type ? 'active' : ''
                    }`}
                  >
                    {singer.name}
                  </li>
                )
              })}
            </ul>
          </div>
          <div class={`select-singer-type-area`}>
            <ul>
              <li style={`font-size: 18px;`}>语种: </li>
              {this.singerAreaArr.map(area => {
                return (
                  <li
                    onClick={() => {
                      ;(this.reqParams.area = area.type),
                        (this.reqParams.page = 1)
                    }}
                    class={`${
                      this.reqParams.area === area.type ? 'active' : ''
                    }`}
                  >
                    {area.name}
                  </li>
                )
              })}
            </ul>
          </div>
          <div class={`select-singer-type-initial`}>
            <ul>
              <li style={`font-size: 18px;`}>筛选: </li>
              {this.singerInitialArr.map(initial => {
                return (
                  <li
                    onClick={() => {
                      ;(this.reqParams.initial = initial),
                        (this.reqParams.page = 1)
                    }}
                    class={`${
                      this.reqParams.initial === initial ? 'active' : ''
                    }`}
                  >
                    {/* {initial} */}
                    {initial === -1 ? '热门' : initial === 0 ? '#' : initial}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <LRecommend list={this.artists}></LRecommend>
        <div class="pagenaintaion">
          <el-pagination
            v-model:currentPage={this.reqParams.page}
            v-model:page-size={this.reqParams.limit}
            page-sizes={[10, 20, 30]}
            background
            disable
            layout="sizes, prev, pager, next, jumper"
            total={950}
          />
        </div>
      </section>
    )
  }
})

export default Singer
