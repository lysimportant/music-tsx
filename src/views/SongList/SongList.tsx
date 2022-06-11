import { defineComponent, reactive, ref, watch } from 'vue'
import LRecommend from '@/components/l-recommend/l-recommend'
import { findSongList, findSongCatList, findBoutique } from '@/api/songdetail'
import './style'
import { useRoute } from 'vue-router'
const SongList = defineComponent({
  name: 'SongList',
  setup(props, { emit }) {
    const route = useRoute()
    // 全部标签
    const catAllList: any = ref([])
    // 部分标签
    const catList: any = ref([])
    // 歌单列表
    const songList = ref([])
    // 精品歌单
    const boutique = ref()
    // 请求数据体
    const reqParams = reactive({
      cat: '全部',
      limit: 30,
      offset: 0,
      page: 1,
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
      // 添加一个前置标签
      catList.value.unshift('全部')
      res.sub.forEach((item: any) => {
        catAllList.value.push(item.name)
      })
    })
    // 精品歌单第一个
    const getBoutique = async () => {
      const res = await findBoutique(reqParams.cat)
      boutique.value = res.playlists[0]
    }
    watch(
      () => route.params.tag,
      v => {
        if (route.params.tag) {
          reqParams.cat = route.params.tag as string
        }
      },
      { immediate: true }
    )
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
        {this.boutique ? (
          <div class="song-list-header">
            <img
              class={`song-list-header-bg`}
              v-lazy={this.boutique?.coverImgUrl}
              alt=""
            />
            <div class="left">
              <img v-lazy={this.boutique?.coverImgUrl} alt="" />
            </div>
            <div class="right">
              <h1>精品歌单</h1>
              <p style={`color: #fff;  font-size: 25px;`}>
                {this.boutique?.name}
              </p>
              <p style={`color: #fff;`} class={`ellipsis-3`}>
                {this.boutique?.description}
              </p>
            </div>
          </div>
        ) : (
          ''
        )}

        <div class="song-list-cat">
          <div class="song-list-cat-left">
            <el-popover placement="bottom-start" width="200">
              {{
                reference: () => {
                  return (
                    <el-button type="primary">
                      {this.reqParams.cat}{' '}
                      <i class={`iconfont l-31fanhui2`}> </i>
                    </el-button>
                  )
                },
                default: () => {
                  return (
                    <ul class={`song-list-cat-left-ul`}>
                      {this.catAllList.map(li => {
                        return (
                          <li
                            onClick={() => {
                              this.reqParams.page = 1
                              this.reqParams.cat = li
                            }}
                          >
                            {li}
                          </li>
                        )
                      })}
                    </ul>
                  )
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
            page-sizes={[30, 50, 70, 100]}
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
