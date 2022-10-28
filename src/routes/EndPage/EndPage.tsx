import { useDispatch, useSelector } from 'react-redux'
import { resetData } from 'store/reducers/tableReducer'
import { RootState } from 'store/store'
import styles from './endPage.module.scss'

const EndPage = () => {
  const dispatch = useDispatch()
  const scoreData = useSelector((state: RootState) => state.table.score)

  const handleClickBtn = () => {
    dispatch(resetData())
  }

  return (
    <div className={styles.endPageWrapper}>
      <p>Good Job!</p>
      <p>Your Score is {scoreData}</p>
      <button type='button' className={styles.tryBtn} onClick={handleClickBtn}>
        Try Again
      </button>
    </div>
  )
}

export default EndPage
