import { IData } from 'types/data'
import getNumArr from 'utils/getRandomNumArr'

const defaultData: IData = {
  0: null,
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
}
export const newArr = Array.from(Array(9), () => defaultData)
export const firstColors = [getNumArr(), getNumArr(), getNumArr()]
