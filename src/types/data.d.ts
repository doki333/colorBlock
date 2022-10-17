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
  dataIndexs: number[]
}

export interface IConseObj {
  horizon: INewObj[]
  vertical: INewObj[]
}
