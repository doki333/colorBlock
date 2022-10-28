import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IInitialcolors } from 'types/data'
import { firstColors } from 'data/dummy'
import getNumArr from 'utils/getRandomNumArr'

const initialState: IInitialcolors = {
  nextColors: firstColors,
  currentIdx: 0,
  alignment: 'horizon',
}

export const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setNewColors: (state, action: PayloadAction<number[][]>) => {
      state.nextColors = action.payload
    },
    resetColors: (state) => {
      const newColors = [getNumArr(), getNumArr(), getNumArr()]
      state.nextColors = newColors
    },
    setIdx: (state, action: PayloadAction<number>) => {
      state.currentIdx = action.payload
    },
    setAlignment: (state, action: PayloadAction<string>) => {
      state.alignment = action.payload
    },
  },
})

export const { setNewColors, resetColors, setIdx, setAlignment } = colorSlice.actions

export default colorSlice.reducer
