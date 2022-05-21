import dayjs from 'dayjs'
export const playCountFormat = (count: number) => {
  if (count > 10000) {
    return (count / 10000).toFixed(0) + 'w'
  } else {
    return count
  }
}
export const playSongTime = (time: number) => {
  return dayjs(time).format('mm:ss')
}
