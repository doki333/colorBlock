import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { newArr } from 'data/dummy'
import { IData, IInitialState } from 'types/data'

const initialState: IInitialState = {
  data: newArr,
  isPlaying: true,
  score: 0,
  currentIdx: 0,
  alignment: 'horizon',
  isAboutToUseItems: false,
  itemKeyword: 'removeOne',
  itemCounts: {
    removeOne: 2,
    refreshBlocks: 1,
    resetTable: 1,
  },
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IData[]>) => {
      state.data = action.payload
    },
    resetData: () => {
      return initialState
    },
    setPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    },
    setScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload
    },
    setIdx: (state, action: PayloadAction<number>) => {
      state.currentIdx = action.payload
    },
    setAlignment: (state, action: PayloadAction<string>) => {
      state.alignment = action.payload
    },
    setUseItems: (state) => {
      state.isAboutToUseItems = !state.isAboutToUseItems
    },
    setItemKeyword: (state, action: PayloadAction<string>) => {
      state.itemKeyword = action.payload
    },
    setCountMinus: (state, action: PayloadAction<string>) => {
      state.itemCounts[action.payload] -= 1
    },
  },
})

export const {
  setData,
  resetData,
  setPlay,
  setScore,
  setIdx,
  setAlignment,
  setUseItems,
  setItemKeyword,
  setCountMinus,
} = tableSlice.actions

export default tableSlice.reducer
