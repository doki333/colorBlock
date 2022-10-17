export const getNumArr = () => {
  const sameNum2 = (n: number, array: number[] | []) => {
    return array.findIndex((e) => e === n)
  }
  const emptyArr: number[] = []
  let newNum2 = 0

  while (newNum2 < 3) {
    const randomNum = Math.floor(Math.random() * 6)
    if (sameNum2(randomNum, emptyArr) === -1) {
      emptyArr.push(randomNum)
      newNum2 += 1
    } else {
      newNum2 = emptyArr.length
    }
  }
  return emptyArr
}
