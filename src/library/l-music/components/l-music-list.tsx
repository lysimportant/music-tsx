import { defineComponent, ref, withModifiers } from 'vue'

import { playSongTime } from '@/hooks'
const LMusicList = defineComponent({
  name: 'LMusicList',
  props: {
    audio: {
      type: Array,
      default: (): any => []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  emits: ['togglePlay', 'clearList', 'put-away-list', 'delete_'],
  setup(props, { emit }) {},
  render() {
    return (
      <div class={`l-music-list-container`}>
        <div class={`music-list-title`}>
          <span>播放列表:{this.audio?.length}</span>{' '}
          <i
            onClick={() => this.$emit('clearList')}
            title="清空列表"
            class={`l-quxiao clearlist iconfont`}
          ></i>
          <i
            onClick={() => this.$emit('put-away-list')}
            title="收起列表"
            class={`iconfont sqlb l-31fanhui1`}
          ></i>
        </div>
        <el-table
          cell-class-name={row => {
            return row.rowIndex === this.currentIndex ? 'active' : ''
          }}
          data={this.audio}
          height={450}
          onRowClick={e => {
            this.$emit('togglePlay', e.id)
          }}
        >
          <el-table-column align="center" type="index" width="50" />
          <el-table-column
            align="center"
            prop="songName"
            label="歌名"
            width="350"
          />
          <el-table-column
            align="center"
            prop="singerName"
            label="歌手"
            width="280"
          />
          <el-table-column
            align="center"
            width="80"
            v-slots={{
              default: scope => {
                return <>{playSongTime(scope.row.duration)}</>
              }
            }}
            label="时长"
          />
          <el-table-column
            label="操作"
            align="center"
            v-slots={{
              default: scope => {
                return (
                  <span
                    onClick={withModifiers(() => {
                      this.$emit('delete_', scope.row.id)
                    }, ['stop', 'prevent'])}
                    style={`cursor: pointer;`}
                  >
                    删除
                  </span>
                )
              }
            }}
          />
        </el-table>
      </div>
    )
  }
})

export default LMusicList
