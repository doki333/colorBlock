import { IData } from 'types/data'

const getFinal = (data: IData[], afterColors: number[][]) => {
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

  let isRowPlayable = false
  let isColumnPlayable = false

  for (let i = 0; i < 9; i += 1) {
    // 가로
    for (let j = 0; j < 7; j += 1) {
      const cellArr = lines3[j].map((cell) => newArr4[i][cell])
      const isAvailable = cellArr.every((value: number | null) => value === null)
      if (isAvailable) {
        isRowPlayable = true
        break
      }
    }
  }

  for (let i = 0; i < 9; i += 1) {
    // 세로
    for (let j = 0; j < 7; j += 1) {
      const cellArr = lines3[j].map((cell) => newArr4[cell][i])
      const isAvailable = cellArr.every((value: number | null) => value === null)
      if (isAvailable) {
        isColumnPlayable = true
        break
      }
    }
  }

  const isColumn = afterColors.every((c, index) => c[index] > 2)
  const isRow = afterColors.every((r, index) => r[index] <= 2)

  if (!isColumn && !isRow) {
    // 섞여있는 경우
    return (isRowPlayable || isColumnPlayable) === true
  }

  return isColumn ? isColumnPlayable : isRowPlayable
}

export default getFinal
