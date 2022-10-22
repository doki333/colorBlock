import { DragEvent } from 'react'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { IData } from 'types/data'

import { cx } from 'styles'
import styles from './dataTable.module.scss'

interface IDataTable {
  handleDrop: (e: DragEvent<HTMLTableCellElement>) => void
  tableData: IData[]
}

const columnHelper = createColumnHelper<IData>()

const DataTable = ({ handleDrop, tableData }: IDataTable) => {
  const columns = tableData.map((arr, newIdx) => {
    return columnHelper.accessor((row) => `${row[newIdx]}`, { id: String(newIdx) })
  })

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const getRow = table.getRowModel().rows

  const handleDragOver = (e: React.DragEvent<HTMLTableElement>) => {
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
