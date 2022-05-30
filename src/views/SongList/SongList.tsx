import { defineComponent, reactive, ref, watch } from 'vue'
import LRecommend from '@/components/l-recommend/l-recommend'
import { findSongList, findSongCatList, findBoutique } from '@/api/songdetail'
import LButton from '@/library/l-button/l-button'
import './style'
const SongList = defineComponent({
  name: 'SongList',
  setup(props, { emit }) {
    const catAllList: any = ref([])
    const catList: any = ref([])
    const songList = ref([])
    const boutique = ref()
    const reqParams = reactive({
      cat: '全部',
      limit: 10,
      offset: 0,
      page: 1,
      pageSize: 10,
      total: 0
    })

    const getSongList = async () => {
      reqParams.offset = (reqParams.page - 1) * reqParams.limit
        // 获取歌单
      const res = await findSongList(reqParams)
      songList.value = res.playlists
      reqParams.total = res.total
    }


    // 获取所有歌单标签
    findSongCatList().then(res => {
      // 直接显示的标签
      for (let i = 0; i < 10; i++) {
        catList.value.push(res.sub[i].name)
      }
      catList.value.unshift('全部')
      res.sub.forEach((item: any) => {
        catAllList.value.push(item.name)
        // if(arr.length === 70) {
        //   for(let i = 0; i< 5;i++) {
        //     catAllList.value.push([{type: i, name: res.categories[i]}])
        //   }
        //   arr.forEach((item, index) => {
        //     if (item.type === 0) {
        //       console.log(item)
        //     }
        //   })
        //   // if (res.categories[0].type)
        // }
      })
    })
    // 精品歌单第一个
    const getBoutique = async () => {
      const res = await findBoutique(reqParams.cat)
      boutique.value =  res.playlists[0]
    }
    watch(
      () => reqParams,
      () => {
        getSongList()
        getBoutique()
      },
      { immediate: true, deep: true }
    )
    return {
      catAllList,
      catList,
      songList,
      boutique,
      reqParams
    }
  },
  render() {
    return (
      <section class={`card`}>
        {this.boutique ?
                <div class="song-list-header">
                <img
                  class={`song-list-header-bg`}
                  src={this.boutique?.coverImgUrl}
                  alt=""
                />
                <div class="left">
                  <img src={this.boutique?.coverImgUrl} alt="" />
                </div>
                <div class="right">
                  <h1>精品歌单</h1>
                  <p>{this.boutique?.name}</p>
                  <p class={`ellipsis-3`}>{this.boutique?.description}</p>
                </div>
              </div>
        : ''}


        <div class="song-list-cat">
          <div class="song-list-cat-left">
            <el-popover placement="bottom-start" width="200">
              {{
                reference: () => {
                  return <el-button type="primary">{this.reqParams.cat}</el-button>
                },
                default: () => {
                  return <ul class={`song-list-cat-left-ul`} >
                    {this.catAllList.map(li => {
                      return <li onClick={() => {
                        this.reqParams.page = 1
                        this.reqParams.cat = li
                      }} >{li}</li>
                    })}
                  </ul>
                }
              }}
            </el-popover>
          </div>
          <div class="song-list-cat-right">
            <ul>
              {this.catList.map(item => {
                return (
                  <li
                    onClick={() => {
                      this.reqParams.page = 1
                      this.reqParams.cat = item
                    }}
                    class={`${this.reqParams.cat === item ? 'active' : ''}`}
                  >
                    {item}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <LRecommend list={this.songList}></LRecommend>
        <div class="pagenaintaion">
        <el-pagination
          v-model:currentPage={this.reqParams.page}
          v-model:page-size={this.reqParams.limit}
          page-sizes={[10, 20, 30]}
          background
          disable
          layout="total, sizes, prev, pager, next, jumper"
          total={this.reqParams.total}
        />
        </div>
      </section>
    )
  }
})

export default SongList
