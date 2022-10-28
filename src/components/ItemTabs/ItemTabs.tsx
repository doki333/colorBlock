import { memo, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { setItemKeyword, setUseItems } from 'store/reducers/itemReducer'
import { ICounts } from 'types/data'

import styles from './itemTabs.module.scss'

interface IItemTabs {
  counts: ICounts
}

const textsArr = ['🧹', '🆕', '🔃']

const ItemTabs = ({ counts }: IItemTabs) => {
  const dispatch = useDispatch()
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { keyword } = e.currentTarget.dataset
    if (keyword) {
      if (counts[keyword] <= 0) return
      dispatch(setUseItems(true))
      dispatch(setItemKeyword(keyword))
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

export default memo(ItemTabs)
