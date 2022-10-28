import { memo, DragEvent, MouseEvent, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'store/store'
import { setData } from 'store/reducers/tableReducer'
import { setCountMinus, setUseItems } from 'store/reducers/itemReducer'

import styles from './dataTable.module.scss'
import { cx } from 'styles'

interface IDataTable {
  handleTable?: (rowindex: string, cellindex: string) => void
  isClickable: boolean
}

const DataTable = ({ handleTable, isClickable }: IDataTable) => {
  const dispatch = useDispatch()
  const tableState = useSelector((state: RootState) => state.table)

  const handleDragOver = (e: DragEvent<HTMLTableElement>) => {
    e.preventDefault()
  }

  const handleDrop = useCallback(
    (e: DragEvent<HTMLTableCellElement>) => {
      const { rowindex, cellindex } = e.currentTarget.dataset

      if (rowindex && cellindex && handleTable) {
        handleTable(rowindex, cellindex)
      }
    },
    [handleTable]
  )

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { rowindex, cellindex } = e.currentTarget.dataset
    if (rowindex && cellindex) {
      const copiedData = [...tableState.data]
      const copiedRow = { ...copiedData[Number(rowindex)] }
      copiedRow[Number(cellindex)] = null
      copiedData[Number(rowindex)] = copiedRow
      dispatch(setUseItems(false))
      dispatch(setData(copiedData))
      dispatch(setCountMinus('removeOne'))
    }
  }

  return (
    <div className={styles.tableWrapper}>
      <table onDragOver={handleDragOver}>
        <tbody>
          {tableState.data.map((row, rIndex) => {
            const rowKey = `row-${rIndex}`
            return (
              <tr key={rowKey}>
                {Object.values(row).map((cell, cIndex) => {
                  const cellKey = `cell-${cIndex}`
                  const isNotEmpty = cell !== null
                  const colorClass = `color${cell}`

                  return (
                    <td
                      key={cellKey}
                      className={cx(styles.tableCell, { [styles[colorClass]]: isNotEmpty })}
                      onDrop={handleDrop}
                      data-rowindex={rIndex}
                      data-cellindex={cIndex}
                    >
                      {isClickable && isNotEmpty && (
                        <button
                          type='button'
                          onClick={handleClick}
                          className={cx(styles.tableBtn, { [styles.isNotExcluded]: isNotEmpty })}
                          data-rowindex={rIndex}
                          data-cellindex={cIndex}
                        >
                          X
                        </button>
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default memo(DataTable)
