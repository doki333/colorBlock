import React from 'react'
import { IData } from 'types/data'

const getFinal = (data: IData[], isColumn: boolean) => {
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

  newArr4.forEach((item, index) => {
    return lines3.forEach((line) => {
      const cellArr = isColumn ? line.map((cell) => newArr4[cell][index]) : line.map((cell) => item[cell])
      const isAvailable = cellArr.every((value: number | null) => value === null)
      if (isAvailable) count += 1
    })
  })
  return count > 0
}

export default getFinal
