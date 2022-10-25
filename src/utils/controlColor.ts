import { IData } from 'types/data'
import { getConsequence } from './controlScore'

export const colorTable = (
  data: IData[],
  isVertical: string,
  current: number[],
  rowIndex: number,
  cellIndex: number
): IData[] | null => {
  const colorChip = [...current]
  let counter = 0

  if (isVertical === 'vertical') {
    //  블록이 세로일 때
    const defaultCells = [{ ...data[rowIndex - 1] }, { ...data[rowIndex] }, { ...data[rowIndex + 1] }]

    if (
      defaultCells[0][cellIndex] !== null ||
      defaultCells[1][cellIndex] !== null ||
      defaultCells[2][cellIndex] !== null
    )
      return null

    for (let i = rowIndex - 1; i <= rowIndex + 1; i += 1) {
      defaultCells[counter][cellIndex] = colorChip[counter]
      counter += 1
    }

    data.splice(rowIndex - 1, 3, ...defaultCells)
    return data
  }

  const defaultRow = { ...data[rowIndex] } // 블록이 가로일 때

  if (defaultRow[cellIndex - 1] !== null || defaultRow[cellIndex] !== null || defaultRow[cellIndex + 1] !== null)
    return null

  for (let i = cellIndex - 1; i <= cellIndex + 1; i += 1) {
    defaultRow[i] = colorChip[counter]
    counter += 1
  }

  data[rowIndex] = defaultRow
  return data
}

export const getRidOfColor = (newArray: IData[]): IData[] => {
  const scoreAndArrs = getConsequence(newArray)
  if (scoreAndArrs === null) return newArray

  scoreAndArrs.vertical.forEach((e) => {
    for (let i = 0; i < e.dataIndexs.length; i += 1) {
      e.dataIndexs[i].forEach((num) => {
        const newRows = { ...newArray[num] }
        newRows[e.standardIndex] = null
        newArray[num] = newRows
      })
    }
  })

  scoreAndArrs.horizon.forEach((e) => {
    for (let i = 0; i < e.dataIndexs.length; i += 1) {
      const newRows = { ...newArray[e.standardIndex] }
      e.dataIndexs[i].forEach((num) => {
        newRows[num] = null
      })
      newArray[e.standardIndex] = newRows
    }
  })
  return newArray
}
