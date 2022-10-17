import { useState, DragEvent, useEffect } from 'react'

import DataTable from 'components/DataTable/DataTable'
import ColorChips from 'components/ColorChips/ColorChips'

import { getNumArr } from 'utils/getRandomNumArr'
import { getScore } from 'utils/getScore'
import { colorTable } from 'utils/colorTable'

import { IData } from 'types/data'
import { newArr } from 'data/dummy'

import styles from './app.module.scss'
import getFinalScore from 'utils/getFinalScore'

const App = () => {
  const [data, setData] = useState([...newArr])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState<[] | number[]>([])
  const [next, setNext] = useState<[] | number[]>([])
  const [play, setPlay] = useState(true)

  const getRandomNum = () => {
    // 다음 등록
    const newNext = getNumArr()

    setCurrent(next)
    setNext(newNext)
  }

  const getRidOfColor = (newArray: IData[]): IData[] => {
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

  const handleDrop = (e: DragEvent<HTMLTableCellElement>) => {
    const { rowindex, cellindex } = e.currentTarget.dataset
    const isVertical = e.dataTransfer.getData('text/plain')

    if (rowindex && cellindex) {
      const newRowIndex = Number(rowindex)
      const newCellIndex = Number(cellindex)

      const isColumnNotAvailable = newRowIndex - 1 < 0 || newRowIndex + 1 > 8
      const isHorizonNotAvailable = newCellIndex - 1 < 0 || newCellIndex + 1 > 8

      if (isVertical === 'vertical' && isColumnNotAvailable) return
      if (isVertical === 'horizon' && isHorizonNotAvailable) return

      const newArr3 = [...data]
      const transferredValue = colorTable(newArr3, isVertical, current, newRowIndex, newCellIndex)

      if (transferredValue === null) return

      setData(transferredValue)
      getRandomNum()
      const finalArr = getRidOfColor(transferredValue)

      const isNextColumn = next[0] > 3
      const isItEnded = getFinalScore(finalArr, isNextColumn)
      setPlay(isItEnded)
    }
  }

  useEffect(() => {
    const firstColor = getNumArr()
    const secondColor = getNumArr()
    setCurrent(firstColor)
    setNext(secondColor)
  }, [])

  useEffect(() => {
    if (!play) {
      console.log('It is ended!')
    }
  }, [play])

  return (
    <div className={styles.appWrapper}>
      <h1>Color Blocks</h1>
      <div>점수: {total}</div>
      <div className={styles.nextWrapper}>
        Next Block
        <ColorChips rgbs={next} draggable={false} />
      </div>
      <DataTable handleDrop={handleDrop} tableData={data} />
      <ColorChips rgbs={current} draggable />
    </div>
  )
}

export default App
