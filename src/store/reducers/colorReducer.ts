import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IInitialcolors } from 'types/data'
import { firstColors } from 'data/dummy'
import getNumArr from 'utils/getRandomNumArr'

const initialState: IInitialcolors = {
  nextColors: firstColors,
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
  },
})

export const { setNewColors, resetColors } = colorSlice.actions

export default colorSlice.reducer
