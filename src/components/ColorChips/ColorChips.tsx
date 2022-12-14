import { memo, DragEvent, TouchEvent, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { setAlignment, setIdx } from 'store/reducers/colorReducer'

import styles from './colorChips.module.scss'
import { cx } from 'styles'

interface IColorChips {
  rgbs: number[]
  order: number
  handleTable: (rowindex: string, cellindex: string) => void
}

let startX = 0
let startY = 0

const ColorChips = ({ rgbs, order, handleTable }: IColorChips) => {
  const dispatch = useDispatch()

  const randomVertical = rgbs[order] > 2

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    const { alignment, index } = e.currentTarget.dataset
    if (alignment) {
      dispatch(setIdx(Number(index)))
      dispatch(setAlignment(alignment))
    }
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const { alignment, index } = e.currentTarget.dataset
    const { clientX, clientY } = e.touches[0]
    startX = clientX
    startY = clientY
    dispatch(setIdx(Number(index)))

    if (alignment) {
      dispatch(setAlignment(alignment))
    }
  }
  const handleMove = (e: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e.touches[0]
    e.currentTarget.style.left = `${clientX - startX}px`
    e.currentTarget.style.top = `${clientY - startY}px`
  }

  const handleEnd = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (e.cancelable) e.preventDefault()
      const { clientX, clientY } = e.changedTouches[0]
      const elements = document.elementsFromPoint(clientX, clientY)
      const elementNames = elements.map((ele) => ele.localName)
      if (!elementNames.includes('td')) {
        e.currentTarget.style.left = `0`
        e.currentTarget.style.top = `0`
        return
      }

      const rowIdx = elements[2].getAttribute('data-rowIndex')
      const cellIdx = elements[2].getAttribute('data-cellIndex')

      if (rowIdx && cellIdx) {
        handleTable(rowIdx, cellIdx)
      }

      e.currentTarget.style.left = `0`
      e.currentTarget.style.top = `0`
    },
    [handleTable]
  )

  return (
    <div
      className={cx(styles.chipWrapper, { [styles.isVertical]: randomVertical })}
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      draggable
      data-alignment={randomVertical ? 'vertical' : 'horizon'}
      data-index={order}
    >
      {rgbs.map((color) => {
        const colorClass = `color${color}`
        return <span key={colorClass} className={cx(styles.eachBlock, styles[colorClass])} />
      })}
    </div>
  )
}

export default memo(ColorChips)
