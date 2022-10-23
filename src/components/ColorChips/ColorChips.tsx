import { memo, DragEvent } from 'react'
import { cx } from 'styles'
import styles from './colorChips.module.scss'

interface IColorChips {
  rgbs: number[]
  index: number
  handleDragStart: (e: DragEvent<HTMLDivElement>) => void
}

const ColorChips = ({ rgbs, index, handleDragStart }: IColorChips) => {
  const randomVertical = rgbs[index] > 2

  return (
    <div
      className={cx(styles.chipWrapper, { [styles.isVertical]: randomVertical })}
      onDragStart={handleDragStart}
      draggable
      data-alignment={randomVertical ? 'vertical' : 'horizon'}
      data-index={index}
    >
      {rgbs.map((color) => {
        const colorClass = `color${color}`
        return <span key={colorClass} className={cx(styles.eachBlock, styles[colorClass])} />
      })}
    </div>
  )
}

export default memo(ColorChips)
