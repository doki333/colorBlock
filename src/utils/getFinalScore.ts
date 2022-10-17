import React from 'react'
import { IData } from 'types/data'

const getFinalScore = (data: IData[], isColumn: boolean) => {
  const newArr4 = [...data]
  const lines3 = [
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5],
    [4, 5, 6],
    [5, 6, 7],
    [6, 7, 8],
  ]
  let count = 0

  if (isColumn) {
    newArr4.forEach((item, index) => {
      return lines3.forEach((line) => {
        const cellArr = line.map((cell) => newArr4[cell][index])
        const isAvailable = cellArr.every((value: number | null) => value === null)
        if (isAvailable) count += 1
      })
    })
    return count > 0
  }

  newArr4.forEach((item) => {
    return lines3.forEach((line) => {
      const cellArr = line.map((cell) => item[cell])
      const isAvailable = cellArr.every((value: number | null) => value === null)
      if (isAvailable) count += 1
    })
  })
  return count > 0
}

//   for (let i = 0; i < 9; i += 1) {
//     // 세로
//     lines3.forEach((e) => {
//       const scoreRows = e.map((num) => prevArr2[num][i])
//       const isScored = scoreRows.every((val) => val !== null && val === scoreRows[0])
//       if (isScored) {
//         const newObj = { standardIndex: i, dataIndexs: e }
//         consequnceObj.vertical.push(newObj)
//       }
//     })
//   }
// }

export default getFinalScore
