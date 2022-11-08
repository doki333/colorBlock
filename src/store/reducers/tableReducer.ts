import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { newArr } from 'data/dummy'
import { IData, IInitialState } from 'types/data'

const initialState: IInitialState = {
  data: newArr,
  isPlaying: true,
  score: 0,
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IData[]>) => {
      state.data = action.payload
    },
    resetData: () => initialState,
    setPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    },
    setScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload
    },
  },
})

export const { setData, resetData, setPlay, setScore } = tableSlice.actions

export default tableSlice.reducer
