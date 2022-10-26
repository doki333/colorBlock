import { newArr } from 'data/dummy'
import { MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { resetColors } from 'store/reducers/colorReducer'
import { setCountMinus, setData, setItemKeyword, setUseItems } from 'store/reducers/tableReducer'
import Swal from 'sweetalert2'
import { ICounts, ITextObj } from 'types/data'

import styles from './itemTabs.module.scss'

interface IItemTabs {
  counts: ICounts
}

const textsArr = ['🧹', '🆕', '🔃']
const textObj: ITextObj = { refreshBlocks: '블럭', resetTable: '테이블' }

const ItemTabs = ({ counts }: IItemTabs) => {
  const dispatch = useDispatch()
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { keyword } = e.currentTarget.dataset
    if (keyword) {
      if (counts[keyword] <= 0) return
      if (keyword === 'removeOne') {
        dispatch(setUseItems())
        dispatch(setItemKeyword(keyword))
        return
      }
      Swal.fire({
        title: `${textObj[keyword]}이 초기화됩니다`,
        icon: 'info',
        showCancelButton: true,
        inputValue: 'okay',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(setItemKeyword(keyword))
          dispatch(setCountMinus(keyword))
          if (keyword === 'refreshBlocks') {
            dispatch(resetColors())
            return
          }
          dispatch(setData(newArr))
        }
      })
    }
  }

  return (
    <div className={styles.btnsWrapper}>
      {counts &&
        Object.keys(counts).map((c, idx) => (
          <button type='button' data-keyword={c} onClick={handleClick} key={`btn-${c}`}>
            {textsArr[idx]}
            <span>{counts[c]}</span>
          </button>
        ))}
    </div>
  )
}

export default ItemTabs
