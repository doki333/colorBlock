import { DragEvent } from 'react'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useSelector } from 'react-redux/es/exports'

import { RootState } from 'store/store'
import { IData } from 'types/data'

import styles from './dataTable.module.scss'
import { cx } from 'styles'

interface IDataTable {
  handleDrop: (e: DragEvent<HTMLTableCellElement>) => void
}

const columnHelper = createColumnHelper<IData>()

const DataTable = ({ handleDrop }: IDataTable) => {
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

  return (
    <div className={styles.tableWrapper}>
      <table onDragOver={handleDragOver}>
        <tbody>
          {getRow.map((row) => (
            <tr key={`row-${row.id}`}>
              {row.getVisibleCells().map((cell, idx) => {
                const colorClass = `color${cell.getValue()}`
                return (
                  <td
                    key={`cell-${cell.id}`}
                    className={cx(styles.tableCell, { [styles[colorClass]]: cell.getValue() !== null })}
                    onDrop={handleDrop}
                    data-rowindex={row.index}
                    data-cellindex={idx}
                  />
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
