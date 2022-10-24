import { IData } from 'types/data'
import getConsequence from './getConsequence'

const getScore2 = (list: IData[]): number => {
  let first = 0
  const lists = getConsequence(list)

  if (lists === null) return 0
  Object.keys(lists).forEach((word: string) => {
    if (!lists[word][0]) return
    first += lists[word][0].dataIndexs.length
  })
  return first
}

export default getScore2
