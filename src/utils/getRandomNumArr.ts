const getNumArr = () => {
  const sameNum2 = (n: number, array: number[] | []) => {
    return array.findIndex((e) => e === n)
  }
  const emptyArr: number[] = []
  let wholeNum = 0

  while (wholeNum < 3) {
    const randomNum = Math.floor(Math.random() * 6)
    if (sameNum2(randomNum, emptyArr) === -1) {
      emptyArr.push(randomNum)
      wholeNum += 1
    } else {
      wholeNum = emptyArr.length
    }
  }
  return emptyArr
}

export default getNumArr
