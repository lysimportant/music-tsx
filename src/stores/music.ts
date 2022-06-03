import { defineStore } from 'pinia'
import { findMusicDetail, findMusicURL } from '@/api/music'
import Toast from '@/plugins/Toast'
interface stateType {
  list: AudioType[] // 歌曲存放的数组
}
type AudioType = {
  id: string
  picUrl: string
  singerName: string
  songName: string
  url: string
  duration: number
}
interface State {
  list: any[]
  isPlay: boolean
}
export const useMusic = defineStore('useMusic', {
  state(): State {
    return {
      list: [],
      isPlay: false
    }
  },
  actions: {
    async playMusic(ids: [number]) {
      // 播放数据
      const audio: AudioType = {}
      // 存储数据
      const list: any = []
      const detail: any = await findMusicDetail(ids)
      const songs: any = await findMusicURL(ids)
      console.log(detail, 'detail')
      detail?.songs.map((item: any, index: number) => {
        audio.id = item.al.id
        audio.duration = item.dt
        audio.picUrl = item.al.picUrl
        audio.singerName = item.al.name
        audio.songName = item.name
        audio.url = songs?.data[index].url
        let obj = this.list.find(item => item.id === audio.id)
        // 不存在 且播放存到后面
        if (!obj && this.isPlay) {
          const obj = JSON.stringify(audio)
          list.push(JSON.parse(obj))
          Toast('success', '已添加到播放列中')
          this.list = [...this.list, ...list]
        } else if (!obj) {
          const obj = JSON.stringify(audio)
          list.unshift(JSON.parse(obj))
          Toast('success', '正在播放')
          this.list = [...list, ...this.list]
        } else {
          Toast('warning', '歌曲已在列表中')
        }
      })
    }
  }
})
