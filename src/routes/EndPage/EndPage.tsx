import styles from './endPage.module.scss'

interface IEndPage {
  handleBtn: () => void
  score: number
}

const EndPage = ({ handleBtn, score }: IEndPage) => {
  console.log(score)
  return (
    <div className={styles.endPageWrapper}>
      <p>Good Job!</p>
      <p>Your Score is {score}</p>
      <button type='button' className={styles.tryBtn} onClick={handleBtn}>
        Try Again
      </button>
    </div>
  )
}

export default EndPage
