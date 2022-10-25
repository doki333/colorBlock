import { useState, DragEvent, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'

import { RootState } from 'store/store'
import { setAlignment, setData, setIdx, setPlay, setScore } from 'store/reducers/tableReducer'

import EndPage from './EndPage/EndPage'
import DataTable from 'components/DataTable/DataTable'
import ColorChips from 'components/ColorChips/ColorChips'

import getNumArr from 'utils/getRandomNumArr'
import { colorTable, getRidOfColor } from 'utils/controlColor'
import { getScore } from 'utils/controlScore'
import getFinal from 'utils/getFinal'

import styles from './app.module.scss'
import Portal from 'components/Portal/portal'

const App = () => {
  const dispatch = useDispatch()

  const gameData = useSelector((state: RootState) => state.table)
  const [nextColors, setNextColors] = useState<[] | number[][]>([])

  const getNextColor = useCallback(
    (num: number) => {
      // 다음 등록
      const newNext = getNumArr()
      const newColors = [...nextColors]

      newColors.splice(num, 1, newNext)
      setNextColors(newColors)
      return newColors
    },
    [nextColors]
  )

  const handleTable = useCallback(
    (rowindex: string, cellindex: string, isVertical: string, currentLocation: number) => {
      const newRowIndex = Number(rowindex)
      const newCellIndex = Number(cellindex)

      const isColumnNotAvailable = newRowIndex - 1 < 0 || newRowIndex + 1 > 8
      const isHorizonNotAvailable = newCellIndex - 1 < 0 || newCellIndex + 1 > 8

      if (isVertical === 'vertical' && isColumnNotAvailable) return
      if (isVertical === 'horizon' && isHorizonNotAvailable) return

      const newArr3 = [...gameData.data]
      const transferredValue = colorTable(newArr3, isVertical, nextColors[currentLocation], newRowIndex, newCellIndex)

      if (transferredValue === null) return

      const blockScore = getScore(transferredValue) // 점수
      const finalArr = getRidOfColor(transferredValue) // 색 제거
      const afterColors = getNextColor(currentLocation) // 다음 색
      const isItEnded = getFinal(finalArr, afterColors) // 게임오버인지 아닌지

      dispatch(setData(finalArr))
      dispatch(setPlay(isItEnded))
      dispatch(setScore(blockScore))
    },
    [dispatch, getNextColor, nextColors, gameData.data]
  )

  const handleDrop = useCallback(
    (e: DragEvent<HTMLTableCellElement>) => {
      const { rowindex, cellindex } = e.currentTarget.dataset
      const isVertical = gameData.alignment

      if (rowindex && cellindex) {
        handleTable(rowindex, cellindex, isVertical, gameData.currentIdx)
      }
    },
    [gameData.alignment, gameData.currentIdx, handleTable]
  )

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    const { alignment, index } = e.currentTarget.dataset
    if (alignment) {
      dispatch(setIdx(Number(index)))
      dispatch(setAlignment(alignment))
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
      <p className={styles.scoreNum}>점수 : {gameData.score}</p>
      <DataTable handleDrop={handleDrop} />
      {nextColors.length !== 0 && (
        <div className={styles.blocksWrapper}>
          {nextColors.map((b, index) => {
            const colorKey = `colorB-${index}`
            return (
              <ColorChips
                key={colorKey}
                rgbs={b}
                order={index}
                handleDragStart={handleDragStart}
                handleTable={handleTable}
              />
            )
          })}
        </div>
      )}
      {!gameData.isPlaying && (
        <Portal>
          <EndPage />
        </Portal>
      )}
    </div>
  )
}

export default App
