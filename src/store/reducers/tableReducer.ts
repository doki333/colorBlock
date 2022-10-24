import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { newArr } from 'data/dummy'
import { IData } from 'types/data'

const initialState = {
  data: newArr,
  isPlaying: true,
  score: 0,
  currentIdx: 0,
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
  },
})

export const { setData, resetData, setPlay, setScore, setIdx } = tableSlice.actions

export default tableSlice.reducer
