import { memo, DragEvent, MouseEvent } from 'react'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'store/store'
import { IData } from 'types/data'

import styles from './dataTable.module.scss'
import { cx } from 'styles'
import { setCountMinus, setData, setUseItems } from 'store/reducers/tableReducer'

interface IDataTable {
  handleDrop?: (e: DragEvent<HTMLTableCellElement>) => void
  isClickable: boolean
}

const columnHelper = createColumnHelper<IData>()

const DataTable = ({ handleDrop, isClickable }: IDataTable) => {
  const dispatch = useDispatch()
  const tableState = useSelector((state: RootState) => state.table)
  const columns = tableState.data.map((arr, newIdx) => {
    return columnHelper.accessor((row) => `${row[newIdx]}`, { id: String(newIdx) })
  })

  const table = useReactTable({
    data: tableState.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const getRow = table.getRowModel().rows

  const handleDragOver = (e: DragEvent<HTMLTableElement>) => {
    e.preventDefault()
  }

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
          {getRow.map((row) => {
            const visibleRows = row.getVisibleCells()
            return (
              <tr key={`row-${row.id}`}>
                {visibleRows.map((cell, idx) => {
                  const colorClass = `color${cell.getValue()}`
                  const isNotEmpty = cell.getValue() !== 'null'
                  return (
                    <td
                      key={`cell-${cell.id}`}
                      className={cx(styles.tableCell, { [styles[colorClass]]: isNotEmpty })}
                      onDrop={handleDrop}
                      data-rowindex={row.index}
                      data-cellindex={idx}
                    >
                      {isClickable && isNotEmpty && (
                        <button
                          type='button'
                          onClick={handleClick}
                          className={cx(styles.tableBtn, { [styles.isNotExcluded]: isNotEmpty })}
                          data-rowindex={row.index}
                          data-cellindex={idx}
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
