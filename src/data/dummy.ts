import { IData, ITextObj } from 'types/data'
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
export const textObjs: ITextObj = {
  removeOne: '지우고 싶은 블럭 하나를 클릭하세요',
  refreshBlocks: '블럭이 초기화 됩니다',
  resetTable: '테이블이 초기화 됩니다',
}
