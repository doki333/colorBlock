import { useDispatch } from 'react-redux'
import { setUseItems } from 'store/reducers/tableReducer'

import DataTable from 'components/DataTable/DataTable'
import styles from './itemPage.module.scss'

const ItemPage = () => {
  const dispatch = useDispatch()

  const handleClickCancel = () => {
    dispatch(setUseItems())
  }

  return (
    <div className={styles.itemWrapper}>
      <p>지우고 싶은 블럭 하나를 클릭하세요</p>
      <DataTable isClickable />
      <button type='button' onClick={handleClickCancel}>
        Close
      </button>
    </div>
  )
}

export default ItemPage
