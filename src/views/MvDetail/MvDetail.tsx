import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findMVDetail, findMvURL, findSimiMv } from '@/api/mv'
import { playCountFormat, playSongTime } from '@/hooks'
import './style'
const MvDetail = defineComponent({
  name: 'MvDetail',
  setup(props, { emit }) {
    const route = useRoute()
    const mv = ref()
    const mvURL = ref()
    const simiMv = ref()
    const getMVDetail = async () => {
      const { data } = await findMVDetail(route.params.id as string)
      mv.value = data
      const res = await findMvURL(mv.value.id)
      mvURL.value = res.data.url
      const simiRes = await findSimiMv(mv.value.id)
      simiMv.value = simiRes.mvs
    }
    watch(
      () => route.params.id,
      () => {
        getMVDetail()
      },
      { immediate: true, deep: true }
    )
    return {
      mv,
      mvURL,
      simiMv
    }
  },
  render() {
    return (
      <div class={`card`}>
        {this.mv ? (
          <div class="mv-detail-header">
            <div class="mv-detail-header-left">
              <video controls src={this.mvURL}></video>
              <div class="user-info">
                <img
                  src={this.mv.artists[0].img1v1Url ?? this.mv.cover}
                  alt=""
                />
                <span>{this.mv.artistName}</span>
              </div>
              <div class="mv-desc">
                <h1>{this.mv?.name}</h1>
                <el-popover
                  placement="bottom-start"
                  trigger="hover"
                  width={520}
                >
                  {{
                    reference: () => {
                      return <el-button>简介</el-button>
                    },
                    default: () => {
                      return <>{this.mv?.desc ?? '简介为空'}</>
                    }
                  }}
                </el-popover>
              </div>
            </div>
            <div class="mv-detail-header-right">
              {this.simiMv?.map(mv => {
                return (
                  <div
                    onClick={() => {
                      this.$router.push(`/mvdetail/${mv.id}`)
                    }}
                    class={`simi-mv-item`}
                  >
                    <div class="simi-mv-item-left">
                      <img src={mv.cover} alt="" />
                      <div class={`simi-mv-item-left-top`}>
                        <i class={`iconfont l-24gl-play`}></i>
                        {playCountFormat(mv.playCount)}
                      </div>
                      <div class={`simi-mv-item-left-bottom`}>
                        {playSongTime(mv.duration)}
                      </div>
                    </div>
                    <div class="simi-mv-item-right">
                      <div class={`simi-mv-item-right-top ellipsis-3`}>
                        {mv.name}
                      </div>
                      <div class={`simi-mv-item-right-bottom`}>
                        by {mv.artistName}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
})

export default MvDetail
