import { createSlice } from '@reduxjs/toolkit'

// initial state
const initialState = {
  version: 'red',
}

// slice
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeVersion(state, action) {
      state.version = action.payload
    },
  },
})

// export actions
export const { changeVersion } = gameSlice.actions

// export reducer
export default gameSlice.reducer
