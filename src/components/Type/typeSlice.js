import axios from 'axios'
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

// entity adapter
const pokemonAdapter = createEntityAdapter()

// initial state
const initialState = pokemonAdapter.getInitialState({
  type: {
    data: {},
    isLoading: true,
    error: {
      status: 'OK',
      message: null,
    },
  },
})

// Thunk functions
export const fetchTypeData = createAsyncThunk(
  'type/fetchTypeData',
  async (type, { rejectWithValue }) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
      console.log('type', response.data)
      // return data
      return response.data
    } catch (err) {
      // Use `err.response` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response)
    }
  }
)

// slice
const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    startLoading(state) {
      state.type.isLoading = true
    },
    cleanData(state) {
      state.type = {
        data: {},
        isLoading: true,
        error: {
          status: 'OK',
          message: null,
        },
      }
    },
  },
  extraReducers: builder => {
    // type
    builder.addCase(fetchTypeData.pending, ({ type }) => {
      type.isLoading = true
    })
    builder.addCase(fetchTypeData.fulfilled, ({ type }, { payload }) => {
      type.data = payload
      // stop loading
      type.isLoading = false
    })
    builder.addCase(fetchTypeData.rejected, ({ type }, { payload }) => {
      // update error
      type.error.status = payload.status
      type.error.message = payload.data
    })
  },
})

// export actions
export const { startLoading, cleanData } = typeSlice.actions

// export reducer
export default typeSlice.reducer
