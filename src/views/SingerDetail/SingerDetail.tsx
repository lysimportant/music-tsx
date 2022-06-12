import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findArtistDetail, findSimiArtist, findArtistMV } from '@/api/singer'
import SingerDetailAlbum from './components/SingerDetailAlbum'
import SingerDetailDesc from './components/SingerDetailDesc'
import SingerDetailMV from './components/SingerDetailMV'
import LRecommend from '@/components/l-recommend/l-recommend'
import { useUser } from '@/stores/user'
import { subArtists } from '@/api/user'
import Toast from '@/plugins/Toast'
import './style'
const SingerDetail = defineComponent({
  name: 'SingerDetail',
  setup(props, { emit }) {
    const UStore = useUser()
    // 歌手详情
    const singerDetail = ref()
    // 获取相似歌手
    const simiArtist = ref()
    // mv 数据
    const mv = ref()
    // 选择卡
    const activeName = ref('album')
    const route = useRoute()
    // 获取作者信息
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
        simiArtist.value = res.artists
        mv.value = resMv.mvs
      },
      { immediate: true }
    )
    const singerSub = async () => {
      if (UStore?.profile.code === 200) {
        const t = singerDetail.value.user.followed === true ? 0 : 1
        const res = await subArtists(singerDetail.value.artist.id, t)
        if (res.code === -462) {
          return Toast('warning', '收藏失败, 需要官方的' + res.data.blockText)
        }
        console.log('收藏切换', t)
        if (t === 0) {
          Toast(
            'success',
            `已为您取消了 ${singerDetail.value.user.nickname} 的收藏`
          )
        } else {
          Toast('success', `已为您收藏了 ${singerDetail.value.user.nickname} `)
        }
        console.log(res)
        getArtistsDetail()
      } else {
        Toast('warning', '亲, 请先登录再操作噢')
      }
    }
    return {
      singerDetail,
      activeName,
      simiArtist,
      mv,
      singerSub
    }
  },
  render() {
    return (
      <section class={`card`}>
        <div class="singer-detail-header">
          <div class="singer-detail-header-left">
            <img v-lazy={this.singerDetail?.artist.cover} alt="" />
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
            {/* <el-popover
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
            </el-popover> */}
            {this.singerDetail?.blacklist !== true ? (
              <el-button
                round
                onClick={() =>
                  this.$router.push(
                    `/user/${this.singerDetail?.user.userId}/detail`
                  )
                }
              >
                个人主页
              </el-button>
            ) : (
              ''
            )}

            <el-button onClick={() => this.singerSub()} round>
              {this.singerDetail?.user.followed ? '已收藏' : '收藏'}
            </el-button>
          </div>
        </div>
        <div class={`toggle-card`}>
          <el-tabs v-model={this.activeName}>
            <el-tab-pane label="专辑" name="album">
              <SingerDetailAlbum></SingerDetailAlbum>
            </el-tab-pane>
            <el-tab-pane height={700} label="MV" name="mv">
              <SingerDetailMV mv={this.mv}></SingerDetailMV>
            </el-tab-pane>
            <el-tab-pane label="歌手详情" name="gs">
              <SingerDetailDesc
                name={this.singerDetail?.artist.name}
              ></SingerDetailDesc>
            </el-tab-pane>
            <el-tab-pane label="相似歌手" name="xs">
              {/* <SingerSimiArtist></SingerSimiArtist> */}
              <LRecommend
                showPlay={false}
                onItemClick={item => {
                  this.$router.push(`/singerdetail/${item.id}`)
                }}
                list={this.simiArtist}
              ></LRecommend>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>
    )
  }
})

export default SingerDetail
