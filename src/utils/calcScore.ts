import { IConseObj, IData, INewObj } from 'types/data'

export const getConsequence = (newArr3: IData[]) => {
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
    const emptyObj1: INewObj = { standardIndex: 0, dataIndexs: [] }
    lines3.forEach((e) => {
      const scoreRows = e.map((num) => newArr3[i][num])
      const isScored = scoreRows.every((val) => val !== null && val === scoreRows[0])
      if (!isScored) return
      emptyObj1.standardIndex = i
      emptyObj1.dataIndexs.push(...e)
      const flattedArr = Array.from(new Set(emptyObj1.dataIndexs.flat()))
      emptyObj1.dataIndexs = flattedArr
    })
    if (emptyObj1.dataIndexs.length !== 0) {
      consequnceObj.horizon.push(emptyObj1)
    }
  }

  for (let i = 0; i < 9; i += 1) {
    // 세로
    const emptyObj2: INewObj = { standardIndex: 0, dataIndexs: [] }
    lines3.forEach((e) => {
      const scoreRows = e.map((num) => newArr3[num][i])
      const isScored = scoreRows.every((val) => val !== null && val === scoreRows[0])
      if (!isScored) return
      emptyObj2.standardIndex = i
      emptyObj2.dataIndexs.push(...e)
      const flattedArr = Array.from(new Set(emptyObj2.dataIndexs.flat()))
      emptyObj2.dataIndexs = flattedArr
    })
    if (emptyObj2.dataIndexs.length !== 0) {
      consequnceObj.vertical.push(emptyObj2)
    }
  }

  if (consequnceObj.horizon.length === 0 && consequnceObj.vertical.length === 0) return null
  return consequnceObj
}

export const calcScore = (list: IData[]): number => {
  let first = 0
  const lists = getConsequence(list)

  if (lists === null) return 0
  Object.keys(lists).forEach((word: string) => {
    if (!lists[word][0]) return
    for (let i = 0; i < lists[word].length; i += 1) {
      const len = lists[word][i].dataIndexs.length
      first += len
    }
  })
  return first
}
