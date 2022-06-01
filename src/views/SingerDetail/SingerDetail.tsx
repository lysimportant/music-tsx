import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findArtistDetail, findSimiArtist, findArtistMV } from '@/api/singer'
import SingerDetailAlbum from './components/SingerDetailAlbum'
import SingerDetailDesc from './components/SingerDetailDesc'
import SingerDetailMV from './components/SingerDetailMV'
import LRecommend from '@/components/l-recommend/l-recommend'
import './style'
const SingerDetail = defineComponent({
  name: 'SingerDetail',
  setup(props, { emit }) {
    const singerDetail = ref()
    const simiArtist = ref()
    const mv = ref()
    const activeName = ref('album')
    const route = useRoute()
    const getArtistsDetail = async () => {
      const res = await findArtistDetail(route.params.id as string)
      singerDetail.value = res.data
    }
    watch(
      () => route.params.id,
      async () => {
        getArtistsDetail()
        const res = await findSimiArtist(route.params.id as string)
        const resMv = await findArtistMV(route.params.id as string)
        console.log(resMv, 'resMv')
        simiArtist.value = res.artists
        mv.value = resMv.mvs
      },
      { immediate: true }
    )
    return {
      singerDetail,
      activeName,
      simiArtist,
      mv
    }
  },
  render() {
    return (
      <section class={`card`}>
        <div class="singer-detail-header">
          <div class="singer-detail-header-left">
            <img src={this.singerDetail?.artist.cover} alt="" />
          </div>
          <div class="singer-detail-header-right">
            <h1>{this.singerDetail?.artist.name}</h1>
            {/* 内容 */}
            <section class={`secondaryExpertIdentiy`}>
              {this.singerDetail?.secondaryExpertIdentiy.map(item => {
                return (
                  <>
                    {item.expertIdentiyCount > 0 ? (
                      <>
                        <span style={`font-weight: 700`}>
                          {item.expertIdentiyName}数:{' '}
                        </span>
                        <i>{item.expertIdentiyCount}</i>
                      </>
                    ) : (
                      ''
                    )}
                  </>
                )
              })}
            </section>
            {/*  */}
            <el-popover
              placement="bottom-start"
              width={1000}
              trigger="hover"
              content="this is content, this is content, this is content"
            >
              {{
                reference: () => {
                  return <el-button>简介</el-button>
                },
                default: () => {
                  return <>{this.singerDetail?.artist.briefDesc}</>
                }
              }}
            </el-popover>
          </div>
        </div>
        <div class={`toggle-card`}>
          <el-tabs
            v-model={this.activeName}
            onTabClick={() => {
              console.log('卡点击了')
            }}
          >
            <el-tab-pane label="专辑" name="album">
              <SingerDetailAlbum></SingerDetailAlbum>
            </el-tab-pane>
            <el-tab-pane height={700} label="MV" name="mv">
              <SingerDetailMV mv={this.mv}></SingerDetailMV>
            </el-tab-pane>
            <el-tab-pane label="歌手详情" name="gs">
              <SingerDetailDesc name={this.singerDetail?.artist.name}></SingerDetailDesc>
            </el-tab-pane>
            <el-tab-pane label="相似歌手" name="xs">
              {/* <SingerSimiArtist></SingerSimiArtist> */}
              <LRecommend onItemClick={(item) => {
                this.$router.push(`/singerdetail/${item.id}`)
              }} list={this.simiArtist}></LRecommend>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>
    )
  }
})

export default SingerDetail
