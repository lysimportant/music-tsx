import { ref } from 'vue'
import { defineStore } from 'pinia'
import { findMusicDetail, findMusicLyrics, findMusicURL } from '@/api/music'
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
  list: []
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
      const audio: AudioType = {}
      const list = []
      const lrc = ref()
      const { songs: detail } = await findMusicDetail(ids)
      const { data: url } = await findMusicURL(ids)
      console.log(url, detail)
      const currentMsuic = this.list.map(item => item.id)
      const endlist = []
      console.log(detail, 'detail')
      detail.map((item, index) => {
        audio.id = item.al.id
        audio.duration = item.dt
        audio.picUrl = item.al.picUrl
        audio.singerName = item.al.name
        audio.songName = item.name
        audio.url = url[index].url
        let obj = this.list.find(item => item.id === audio.id)
        if (!obj && this.isPlay) {
          const obj = JSON.stringify(audio)
          list.push(JSON.parse(obj))
          this.list = [...this.list, ...list]
        } else {
          const obj = JSON.stringify(audio)
          list.unshift(JSON.parse(obj))
          this.list = [...list, ...this.list]
        }
      })
    }
  }
})
