import { useState, DragEvent, useEffect, useCallback, useRef } from 'react'

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
  const [nextColors, setNextColors] = useState<[] | number[][]>([])
  const [play, setPlay] = useState(true)

  const colorIdx = useRef(0)

  const getNextColor = useCallback(() => {
    // 다음 등록
    const newNext = getNumArr()
    const newColors = [...nextColors]

    newColors.splice(colorIdx.current, 1, newNext)
    setNextColors(newColors)
    return newColors
  }, [nextColors])

  const handleDrop = useCallback(
    (e: DragEvent<HTMLTableCellElement>) => {
      const { rowindex, cellindex } = e.currentTarget.dataset
      const isVertical = e.dataTransfer.getData('text/plain')
      const currentIdx = colorIdx.current

      if (rowindex && cellindex) {
        const newRowIndex = Number(rowindex)
        const newCellIndex = Number(cellindex)

        const isColumnNotAvailable = newRowIndex - 1 < 0 || newRowIndex + 1 > 8
        const isHorizonNotAvailable = newCellIndex - 1 < 0 || newCellIndex + 1 > 8

        if (isVertical === 'vertical' && isColumnNotAvailable) return
        if (isVertical === 'horizon' && isHorizonNotAvailable) return

        const newArr3 = [...data]
        const transferredValue = colorTable(newArr3, isVertical, nextColors[currentIdx], newRowIndex, newCellIndex)

        if (transferredValue === null) return

        const finalArr = getRidOfColor(transferredValue, setTotal)
        const afterColors = getNextColor()
        const isItEnded = getFinal(finalArr, afterColors)

        setData(finalArr)
        setPlay(isItEnded)
      }
    },
    [data, getNextColor, nextColors]
  )

  const handleClickBtn = () => {
    setPlay((prev) => !prev)
    setData(newArr)
    setTotal(0)
  }

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    const { alignment, index } = e.currentTarget.dataset
    if (alignment) {
      e.dataTransfer.setData('text/plain', alignment)
      colorIdx.current = Number(index)
    }
  }

  useEffect(() => {
    const firstColor = getNumArr()
    const secondColor = getNumArr()
    const thirdColor = getNumArr()
    setNextColors([firstColor, secondColor, thirdColor])
  }, [])

  return (
    <div className={styles.appWrapper}>
      <h1>Color Blocks</h1>
      <ScoreBoard total={total} />
      <DataTable handleDrop={handleDrop} tableData={data} />
      {nextColors.length !== 0 && (
        <div className={styles.blocksWrapper}>
          {nextColors.map((b, index) => {
            const colorKey = `colorB-${index}`
            return <ColorChips key={colorKey} rgbs={b} index={index} handleDragStart={handleDragStart} />
          })}
        </div>
      )}
      {!play && <EndPage handleBtn={handleClickBtn} score={total} />}
    </div>
  )
}

export default App
