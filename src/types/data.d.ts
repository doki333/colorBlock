export interface IData {
  0: null | number
  1: null | number
  2: null | number
  3: null | number
  4: null | number
  5: null | number
  6: null | number
  [key: string]: null | number
}

export interface INewObj {
  standardIndex: number
  dataIndexs: number[][]
}

export interface IConseObj {
  horizon: INewObj[]
  vertical: INewObj[]
  [key: string]: INewObj[]
}

export interface ICounts {
  removeOne: number
  refreshBlocks: number
  resetTable: number
  [key: string]: number
}

export interface IInitialState {
  data: IData[]
  isPlaying: boolean
  score: number
  currentIdx: number
  alignment: string
  isAboutToUseItems: boolean
  itemKeyword: string
  itemCounts: ICounts
}

export interface IInitialcolors {
  nextColors: [] | number[][]
}

export interface ITextObj {
  refreshBlocks: string
  resetTable: string
  [key: string]: string
}
