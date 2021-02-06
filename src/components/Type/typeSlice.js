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
  data: {},
  isLoading: true,
  error: {
    status: 'OK',
    message: null,
  },
})

// Thunk functions
export const fetchTypeData = createAsyncThunk(
  'type/fetchTypeData',
  async (type, { rejectWithValue }) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
      // console.log('type', response.data)
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
    builder.addCase(fetchTypeData.pending, state => {
      state.isLoading = true
    })
    builder.addCase(fetchTypeData.fulfilled, (state, { payload }) => {
      state.data = payload
      // stop loading
      state.isLoading = false
    })
    builder.addCase(fetchTypeData.rejected, (state, { payload }) => {
      // update error
      state.error.status = payload.status
      state.error.message = payload.data
    })
  },
})

// export actions
export const { startLoading, cleanData } = typeSlice.actions

// export reducer
export default typeSlice.reducer
