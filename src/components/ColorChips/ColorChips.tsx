import { memo, DragEvent } from 'react'
import { cx } from 'styles'
import styles from './colorChips.module.scss'

interface IColorChips {
  rgbs: number[]
  draggable: boolean
}

const ColorChips = ({ rgbs, draggable }: IColorChips) => {
  const randomVertical = rgbs[0] > 3

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    const { alignment } = e.currentTarget.dataset
    if (alignment) {
      e.dataTransfer.setData('text/plain', alignment)
    }
  }
  return (
    <div
      className={cx(styles.chipWrapper, { [styles.isVertical]: randomVertical })}
      onDragStart={handleDragStart}
      draggable={draggable}
      data-alignment={randomVertical ? 'vertical' : 'horizon'}
    >
      {rgbs.map((color) => {
        const colorClass = `color${color}`
        return <span key={colorClass} className={cx(styles.eachBlock, styles[colorClass])} />
      })}
    </div>
  )
}

export default memo(ColorChips)
