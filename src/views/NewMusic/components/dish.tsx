import { defineComponent, ref } from 'vue'
import { useMusic } from '@/stores/music'
import { dishArrType } from './config'
import { findDish } from '@/api/newsong'
import './style/dish'
const Dish = defineComponent({
  name: 'Dish',
  setup(props, { emit }) {
    const currentType = ref('ALL')
    const MStore = useMusic()
    const musicList = ref([])
    const getDish = async (Type: string) => {
      currentType.value = Type
      const { albums } = await findDish(Type)
      musicList.value = albums
      console.log(musicList.value)
    }
    getDish(currentType.value)
    const playMusic = (id: number) => {
      console.log(id)
      MStore.playMusic([id])
    }
    return {
      dishArrType,
      currentType,
      musicList,
      getDish,
      playMusic
    }
  },
  render() {
    return (
      <>
        <div style={`font-size: 16px; margin: 20px; 10px;`}>
          {this.dishArrType.map(item => {
            return (
              <span
                style={`margin: 20px; cursor: pointer;`}
                class={`${
                  this.currentType === item.type ? 'songTypeActive' : ''
                }`}
                onClick={() => {
                  this.getDish(item.type)
                }}
              >
                {item.name}
              </span>
            )
          })}
        </div>
        <div class="dish-container">
          {this.musicList.map((item: any) => {
            return (
              <div
                onClick={() => {
                  this.playMusic(item.id)
                }}
                class="dish-container-item"
              >
                <img src={item.picUrl} alt="" />
                <p class={`ellipsis`}>{item.name}</p>
                <span>{item.artist.name}</span>
              </div>
            )
          })}
        </div>
      </>
    )
  }
})

export default Dish
