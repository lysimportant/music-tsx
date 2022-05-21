export const playCountFormat = (count: number) => {
  if (count > 10000) {
    console.log(count)
    return (count / 10000).toFixed(0) + 'w'

  } else {
    return count
  }
}
