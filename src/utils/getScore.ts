import { IData } from 'types/data'
import getConsequence from './getConsequence'

const getScore2 = (list: IData[]): number => {
  let first = 0
  const lists = getConsequence(list)

  if (lists === null) return 0
  Object.keys(lists).forEach((word: string) => {
    if (!lists[word][0]) return
    for (let i = 0; i < lists[word].length; i += 1) {
      const len = lists[word][i].dataIndexs.length
      const newScore = len * 3 - 2 * (len - 1)
      first += newScore
    }
  })
  return first
}

export default getScore2
