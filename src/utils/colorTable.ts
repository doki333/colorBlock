import { IData } from 'types/data'

export function colorTable(
  data: IData[],
  isVertical: string,
  current: number[],
  rowIndex: number,
  cellIndex: number
): IData[] | null {
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
