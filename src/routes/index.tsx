import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'store/store'
import { setData, setPlay, setScore } from 'store/reducers/tableReducer'
import { setNewColors } from 'store/reducers/colorReducer'

import EndPage from 'routes/EndPage/EndPage'
import ItemPage from 'routes/ItemPage/ItemPage'

import DataTable from 'components/DataTable/DataTable'
import ColorChips from 'components/ColorChips/ColorChips'
import Portal from 'components/Portal/portal'
import ItemTabs from 'components/ItemTabs/ItemTabs'
import ScoreBoard from 'components/ScoreBoard/ScoreBoard'

import getNumArr from 'utils/getRandomNumArr'
import { getScore } from 'utils/controlScore'
import { colorTable, getRidOfColor } from 'utils/controlColor'
import getFinal from 'utils/getFinal'

import styles from './app.module.scss'

const App = () => {
  const dispatch = useDispatch()

  const gameData = useSelector((state: RootState) => state.table)
  const colorData = useSelector((state: RootState) => state.color)
  const itemData = useSelector((state: RootState) => state.item)

  const getNextColor = useCallback(
    (num: number) => {
      // 다음 등록
      const newNext = getNumArr()
      const newColors = [...colorData.nextColors]

      newColors.splice(num, 1, newNext)
      dispatch(setNewColors(newColors))
      return newColors
    },
    [colorData, dispatch]
  )

  const handleTable = (rowindex: string, cellindex: string) => {
    const isVertical = colorData.alignment
    const currentLocation = colorData.currentIdx
    const newRowIndex = Number(rowindex)
    const newCellIndex = Number(cellindex)

    const isColumnNotAvailable = newRowIndex - 1 < 0 || newRowIndex + 1 > 8
    const isHorizonNotAvailable = newCellIndex - 1 < 0 || newCellIndex + 1 > 8

    if (isVertical === 'vertical' && isColumnNotAvailable) return
    if (isVertical === 'horizon' && isHorizonNotAvailable) return

    const newArr3 = [...gameData.data]
    const transferredValue = colorTable(
      newArr3,
      isVertical,
      colorData.nextColors[currentLocation],
      newRowIndex,
      newCellIndex
    )

    if (!transferredValue) return

    const blockScore = getScore(transferredValue) // 점수
    const finalArr = getRidOfColor(transferredValue) // 색 제거
    const afterColors = getNextColor(currentLocation) // 다음 색
    const isItEnded = getFinal(finalArr, afterColors) // 게임오버인지 아닌지

    dispatch(setData(finalArr))
    dispatch(setPlay(isItEnded))
    dispatch(setScore(blockScore))
  }

  return (
    <div className={styles.appWrapper}>
      <h1>Color Blocks</h1>
      <ScoreBoard total={gameData.score} />
      <ItemTabs counts={itemData.itemCounts} />
      <DataTable handleTable={handleTable} isClickable={false} />
      <div className={styles.blocksWrapper}>
        {colorData.nextColors.map((b, index) => {
          const colorKey = `colorB-${index}`
          return <ColorChips key={colorKey} rgbs={b} order={index} handleTable={handleTable} />
        })}
      </div>
      <ItemPage isAvailable={itemData.isAboutToUseItems} />
      {!gameData.isPlaying && (
        <Portal>
          <EndPage />
        </Portal>
      )}
    </div>
  )
}

export default App
