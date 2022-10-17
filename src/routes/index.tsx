import { useState, DragEvent, useEffect } from 'react'

import DataTable from 'components/DataTable/DataTable'
import ColorChips from 'components/ColorChips/ColorChips'

import getNumArr from 'utils/getRandomNumArr'
import { colorTable, getRidOfColor } from 'utils/controlColor'
import getFinal from 'utils/getFinal'

import { newArr } from 'data/dummy'

import styles from './app.module.scss'
import EndPage from './EndPage/EndPage'

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
      const finalArr = getRidOfColor(transferredValue, setData, setTotal)

      const isNextColumn = next[0] > 3
      const isItEnded = getFinal(finalArr, isNextColumn)
      setPlay(isItEnded)
    }
  }

  const handleClickBtn = () => {
    setPlay((prev) => !prev)
    setData([...newArr])
    setTotal(0)
  }

  useEffect(() => {
    const firstColor = getNumArr()
    const secondColor = getNumArr()
    setCurrent(firstColor)
    setNext(secondColor)
  }, [])

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
      {!play && <EndPage handleBtn={handleClickBtn} score={total} />}
    </div>
  )
}

export default App
