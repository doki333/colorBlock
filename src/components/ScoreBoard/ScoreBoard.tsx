import { memo } from 'react'
import styles from './scoreBoard.module.scss'

interface IScoreBoard {
  total: number
}

const ScoreBoard = ({ total }: IScoreBoard) => {
  return <p className={styles.scoreNum}>점수 : {total}</p>
}

export default memo(ScoreBoard)
