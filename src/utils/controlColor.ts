import { SetStateAction, Dispatch } from 'react'
import { IData } from 'types/data'
import getScore from './getScore'

export const colorTable = (
  data: IData[],
  isVertical: string,
  current: number[],
  rowIndex: number,
  cellIndex: number
): IData[] | null => {
  const newArr3 = [...data]
  const colorChip = [...current]
  let counter = 0

  if (isVertical === 'vertical') {
    const defaultCells = [{ ...newArr3[rowIndex - 1] }, { ...newArr3[rowIndex] }, { ...newArr3[rowIndex + 1] }]

    if (
      defaultCells[0][cellIndex] !== null ||
      defaultCells[1][cellIndex] !== null ||
      defaultCells[2][cellIndex] !== null
    )
      return null

    for (let i = rowIndex - 1; i <= rowIndex + 1; i += 1) {
      const currentCell = defaultCells[counter]

      currentCell[cellIndex] = colorChip[counter]
      counter += 1
    }

    newArr3.splice(rowIndex - 1, 3, ...defaultCells)
    return newArr3
  }

  const defaultRow = { ...newArr3[rowIndex] }

  if (defaultRow[cellIndex - 1] !== null || defaultRow[cellIndex] !== null || defaultRow[cellIndex + 1] !== null)
    return null

  for (let i = cellIndex - 1; i <= cellIndex + 1; i += 1) {
    defaultRow[i] = colorChip[counter]
    counter += 1
  }

  newArr3[rowIndex] = defaultRow
  return newArr3
}

export const getRidOfColor = (
  newArray: IData[],
  setData: Dispatch<SetStateAction<IData[]>>,
  setTotal: Dispatch<SetStateAction<number>>
): IData[] => {
  const newArr4 = [...newArray]

  let horizonScore = 0
  let verticalScore = 0

  const scoreAndArrs = getScore(newArr4)
  if (scoreAndArrs === null) return newArr4

  scoreAndArrs.vertical.forEach((e) => {
    verticalScore += e.dataIndexs.length
    e.dataIndexs.forEach((idx) => {
      const newRows = { ...newArr4[idx] }
      newRows[e.standardIndex] = null
      newArr4[idx] = newRows
    })
  })

  scoreAndArrs.horizon.forEach((e) => {
    horizonScore += e.dataIndexs.length
    e.dataIndexs.forEach((idx) => {
      const newRows = { ...newArr4[e.standardIndex] }
      newRows[idx] = null
      newArr4[e.standardIndex] = newRows
    })
  })

  setData(newArr4)

  setTotal((prev) => prev + horizonScore + verticalScore)
  return newArr4
}
