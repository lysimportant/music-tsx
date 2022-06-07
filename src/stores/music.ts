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
    async playMusic(ids: [number], sort?: number) {
      const musicDetail: any = await findMusicDetail(ids)
      const songDetail: any = await findMusicURL(ids)
      musicDetail.songs.forEach((item: any, index: number) => {
        const Index = this.list.findIndex(lis => lis.id === item.id)
        if (Index === -1 && sort == 1 && songDetail?.data[index].url !== null) {
          this.list = [
            {
              id: item.id,
              duration: item.dt,
              picUrl: item.al.picUrl,
              singerName: item.ar[0].name,
              songName: item.name,
              url: songDetail?.data[index].url
            },
            ...this.list
          ]
          return index < 1 ? Toast('success', item.name + ' 正在播放') : ''
        } else if (
          (Index === -1 && sort === 1) ||
          (sort === 0 && songDetail?.data[index].url === null)
        ) {
          findMusicURL(musicDetail.songs[index].id).then(res => {
            this.list.unshift({
              id: musicDetail.songs[index].id,
              duration: musicDetail.songs[index].dt,
              picUrl: musicDetail.songs[index].al.picUrl,
              singerName: musicDetail.songs[index].ar[0].name,
              songName: musicDetail.songs[index].name,
              url: res.data[0].url
            })
            this.list.reverse()
            return index < 1
              ? Toast('success', musicDetail.songs[index].name + ' 正在播放')
              : ''
          })
        } else {
          // 默认播放
          if (Index === -1 && songDetail?.data[index].url !== null) {
            if (this.isPlay) {
              this.list.push({
                id: item.id,
                duration: item.dt,
                picUrl: item.al.picUrl,
                singerName: item.ar[0].name,
                songName: item.name,
                url: songDetail?.data[index].url
              })
              return Toast('success', item.name + ' 已添加到播放列中')
            } else {
              this.list = [
                {
                  id: item.id,
                  duration: item.dt,
                  picUrl: item.al.picUrl,
                  singerName: item.ar[0].name,
                  songName: item.name,
                  url: songDetail?.data[index].url
                },
                ...this.list
              ]
              return index < 1 ? Toast('success', item.name + ' 正在播放') : ''
            }
          } else {
            if (index < 1) {
              Toast('warning', item.name + ' 歌曲已在列表中')
            }
          }
        }
      })
    }
  }
})
