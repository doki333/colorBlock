import { IConseObj, IData } from 'types/data'

export const getScore = (newArr3: IData[]) => {
  const prevArr = [...newArr3]
  const prevArr2 = [...newArr3]
  const lines3 = [
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5],
    [4, 5, 6],
    [5, 6, 7],
    [6, 7, 8],
  ]
  const consequnceObj: IConseObj = { horizon: [], vertical: [] }

  for (let i = 0; i < 9; i += 1) {
    // 가로
    lines3.forEach((e) => {
      const scoreRows = e.map((num) => prevArr[i][num])
      const isScored = scoreRows.every((val) => val !== null && val === scoreRows[0])
      if (isScored) {
        const newObj = { standardIndex: i, dataIndexs: e }
        consequnceObj.horizon.push(newObj)
      }
    })
  }

  for (let i = 0; i < 9; i += 1) {
    // 세로
    lines3.forEach((e) => {
      const scoreRows = e.map((num) => prevArr2[num][i])
      const isScored = scoreRows.every((val) => val !== null && val === scoreRows[0])
      if (isScored) {
        const newObj = { standardIndex: i, dataIndexs: e }
        consequnceObj.vertical.push(newObj)
      }
    })
  }

  if (consequnceObj.horizon.length === 0 && consequnceObj.vertical.length === 0) return null
  return consequnceObj
}
