import { defineComponent, KeepAlive, ref } from 'vue'
import NewSong from './components/song'
import Dish from './components/dish'
import './components/style/new-music'
const NewMusic = defineComponent({
  name: 'NewMusic',
  setup(props, { emit }) {
    const currentMusic = ref(0)
    return {
      currentMusic
    }
  },
  render() {
    return (
      <div class={`card`}>
        <div class={`selectMusic`}>
          <div class={`selectMusic-container`}>
            <span
              onClick={() => {
                this.currentMusic = 0
              }}
              class={`song ${
                this.currentMusic === 0 ? 'selectMusic-container-active' : ''
              }`}
            >
              新歌速递
            </span>
            <i class={`died`}></i>
            <span
              onClick={() => {
                this.currentMusic = 1
              }}
              class={`dish ${
                this.currentMusic === 1 ? 'selectMusic-container-active' : ''
              }`}
            >
              新碟上架
            </span>
          </div>
        </div>
        <KeepAlive>
          {this.currentMusic === 0 ? <NewSong></NewSong> : <Dish></Dish>}
        </KeepAlive>
      </div>
    )
  }
})

export default NewMusic
