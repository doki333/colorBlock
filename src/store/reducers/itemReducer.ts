import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IItemState } from 'types/data'

const initialState: IItemState = {
  isAboutToUseItems: false,
  itemKeyword: 'removeOne',
  itemCounts: {
    removeOne: 2,
    refreshBlocks: 1,
    resetTable: 1,
  },
}

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setUseItems: (state, action: PayloadAction<boolean>) => {
      state.isAboutToUseItems = action.payload
    },
    setItemKeyword: (state, action: PayloadAction<string>) => {
      state.itemKeyword = action.payload
    },
    setCountMinus: (state, action: PayloadAction<string>) => {
      state.itemCounts[action.payload] -= 1
    },
  },
})

export const { setUseItems, setItemKeyword, setCountMinus } = itemSlice.actions

export default itemSlice.reducer
