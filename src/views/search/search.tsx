import { defineComponent, reactive, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMusic } from '@/stores/music'
import { search } from '@/api/search'
import { searchType } from './config'
import SearchCom from './components/searchCom'
import SearchUser from './components/searchUser'
import SearchDj from './components/searchDj'
import LRecommend from '@/components/l-recommend/l-recommend'
import SingerDetailMV from '../SingerDetail/components/SingerDetailMV'
import './style'
const Search = defineComponent({
  name: 'Search',
  setup(props, { emit }) {
    const route = useRoute()
    const MStore = useMusic()
    const activeName = ref(1)
    const reqParams = reactive({
      offset: 0,
      limit: 15,
      type: 1,
      keywords: '',
      total: 10,
      page: 1
    })
    const search_ = ref([])
    const getSearch = async (keywords: string) => {
      reqParams.keywords = keywords
      const res: any = await search({
        type: reqParams.type,
        limit: reqParams.limit,
        offset: reqParams.offset,
        keywords
      })
      if (reqParams.type === 1) {
        // 歌曲
        search_.value = res.result?.songs
        reqParams.total = res.result?.songCount
        console.log(search_)
      } else if (reqParams.type === 1000) {
        // 歌单
        search_.value = res.result?.playlists
        reqParams.total = res.result?.playlistCount
        console.log(search_)
      } else if (reqParams.type === 100) {
        // 歌手
        search_.value = res.result?.artists
        reqParams.total = res.result?.artistCount
        console.log(search_)
      } else if (reqParams.type === 10) {
        // 专辑
        search_.value = res.result?.albums
        reqParams.total = res.result?.albumCount
        console.log(search_)
      } else if (reqParams.type === 1002) {
        // 用户
        search_.value = res.result?.userprofiles
        reqParams.total = res.result?.userprofileCount
        console.log(search_)
      } else if (reqParams.type === 1004) {
        // MV
        search_.value = res.result?.mvs
        reqParams.total = res.result?.mvCount
        console.log(search_)
      } else if (reqParams.type === 1009) {
        // 电台
        search_.value = res.result?.djRadios
        reqParams.total = res.result?.djRadiosCount
        console.log(search_)
      }
    }
    watch(
      () => route.params.comment,
      () => {
        getSearch(route.params.comment as string)
      },
      { immediate: true, deep: true }
    )
    const playMusic = (id: number) => {
      MStore.playMusic([id])
    }
    const TabSearchClick = async props => {
      reqParams.page = 1
      const { name } = props
      reqParams.type = name
      getSearch(route.params.comment as string)
    }
    watch(
      () => reqParams,
      () => {
        reqParams.offset = (reqParams.page - 1) * reqParams.limit
        getSearch(route.params.comment as string)
      },
      { immediate: true, deep: true }
    )
    return {
      reqParams,
      search_,
      activeName,
      searchType,
      playMusic,
      TabSearchClick,
      getSearch
    }
  },
  render() {
    return (
      <div class={`card`}>
        <div class="search-container">
          <div class={`search-header`}>
            <span class={`search-title`}>您搜索的是: </span>
            <h1> {this.reqParams.keywords}</h1>
            <span class={`search-title`}>{this.reqParams.total}个结果</span>
          </div>
          <el-tabs
            v-model={this.activeName}
            onTabClick={(item, e) => {
              this.TabSearchClick(item.props)
            }}
          >
            {this.searchType.map(item => {
              return (
                <el-tab-pane label={item.name} name={item.type}></el-tab-pane>
              )
            })}
          </el-tabs>
          {this.reqParams.type === 1 ? (
            <SearchCom
              onUpdateSearch={() =>
                this.getSearch(this.$route.params.comment as string)
              }
              search={this.search_}
            ></SearchCom>
          ) : (
            ''
          )}
          {this.reqParams.type === 1000 ? (
            <LRecommend list={this.search_}></LRecommend>
          ) : (
            ''
          )}
          {this.reqParams.type === 100 ? (
            <LRecommend showPlay={false} list={this.search_}></LRecommend>
          ) : (
            ''
          )}
          {this.reqParams.type === 10 ? (
            <LRecommend showPlay={false} list={this.search_}></LRecommend>
          ) : (
            ''
          )}
          {this.reqParams.type === 1002 ? (
            <SearchUser search_={this.search_}></SearchUser>
          ) : (
            ''
          )}
          {this.reqParams.type === 1004 ? (
            <SingerDetailMV mv={this.search_}></SingerDetailMV>
          ) : (
            ''
          )}
          {this.reqParams.type === 1009 ? (
            <SearchDj search_={this.search_}></SearchDj>
          ) : (
            ''
          )}
        </div>
        <div class="pagenaintaion">
          <el-pagination
            v-model:currentPage={this.reqParams.page}
            v-model:page-size={this.reqParams.limit}
            page-sizes={[15, 50, 70, 100]}
            background
            disable
            layout="sizes, prev, pager, next"
            total={this.reqParams.total}
            onSizeChange={e => {
              this.reqParams.limit = e
            }}
          />
        </div>
      </div>
    )
  }
})

export default Search
