import { defineStore } from 'pinia'
interface userState {
  profile: any
  userDetail: any
  likeList: any[]
}
export const useUser = defineStore('useUser', {
  state(): userState {
    return {
      profile: {},
      userDetail: {},
      likeList: []
    }
  },
  actions: {}
})
