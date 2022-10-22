import { useState, DragEvent, useEffect, useCallback } from 'react'

import EndPage from './EndPage/EndPage'
import DataTable from 'components/DataTable/DataTable'
import ColorChips from 'components/ColorChips/ColorChips'
import ScoreBoard from 'components/ScoreBoard/ScoreBoard'

import { newArr } from 'data/dummy'

import getNumArr from 'utils/getRandomNumArr'
import { colorTable, getRidOfColor } from 'utils/controlColor'
import getFinal from 'utils/getFinal'

import styles from './app.module.scss'

const App = () => {
  const [data, setData] = useState([...newArr])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState<[] | number[]>([])
  const [next, setNext] = useState<[] | number[]>([])
  const [play, setPlay] = useState(true)

  const getRandomNum = useCallback(() => {
    // 다음 등록
    const newNext = getNumArr()

    setCurrent(next)
    setNext(newNext)
  }, [next])

  const handleDrop = useCallback(
    (e: DragEvent<HTMLTableCellElement>) => {
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

        const finalArr = getRidOfColor(transferredValue, setTotal)

        const isNext = next[0] > 3
        const isItEnded = getFinal(finalArr, isNext)
        setData(finalArr)
        setPlay(isItEnded)
        getRandomNum()
      }
    },
    [current, data, getRandomNum, next]
  )

  const handleClickBtn = () => {
    setPlay((prev) => !prev)
    setData(newArr)
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
      <ScoreBoard total={total} />
      <DataTable handleDrop={handleDrop} tableData={data} />
      <div className={styles.blocksWrapper}>
        <div>
          Current
          <ColorChips rgbs={current} draggable />
        </div>
        <div>
          Next
          <ColorChips rgbs={next} draggable={false} />
        </div>
      </div>
      {!play && <EndPage handleBtn={handleClickBtn} score={total} />}
    </div>
  )
}

export default App
