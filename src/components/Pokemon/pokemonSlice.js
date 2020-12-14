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
  biology: null,
  biologyStatus: {
    isLoadingBiology: false,
    error: {
      status: 'OK',
      message: null,
    },
  },
  data: null,
  dataStatus: {
    isLoadingData: false,
    error: {
      status: 'OK',
      message: null,
    },
  },
})

// Thunk functions
export const fetchPokemonData = createAsyncThunk(
  'home/fetchPokemonData',
  async (pokemon, { dispatch, rejectWithValue }) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    // console.log(payload)
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      )
      console.log('data', response.data)
      // get biology
      dispatch(fetchPokemonBiology(response.data.species.url))
      // return data
      return response.data
    } catch (err) {
      // Use `err.response` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response)
    }
  }
)
export const fetchPokemonBiology = createAsyncThunk(
  'home/fetchPokemonBiology',
  async (biologyUrl, { dispatch, rejectWithValue }) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    // console.log(payload)
    try {
      const response = await axios.get(biologyUrl)
      console.log('biology', response.data)
      return response.data
    } catch (err) {
      // Use `err.response` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response)
    }
  }
)

// slice
const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    toggleStatus(state, action) {
      state.isLoadingData = action.payload
    },
  },
  extraReducers: (builder) => {
    // data
    builder.addCase(fetchPokemonData.pending, (state, action) => {
      state.dataStatus.isLoadingData = true
    })
    builder.addCase(fetchPokemonData.fulfilled, (state, action) => {
      state.data = action.payload
      // stop loading
      state.dataStatus.isLoadingData = false
    })
    builder.addCase(fetchPokemonData.rejected, (state, action) => {
      state.dataStatus.error.status = action.payload.status
      state.dataStatus.error.message = action.payload.data
      state.dataStatus.isLoadingData = false
    })
    // biology
    builder.addCase(fetchPokemonBiology.pending, (state, action) => {
      state.biologyStatus.isLoadingBiology = true
    })
    builder.addCase(fetchPokemonBiology.fulfilled, (state, action) => {
      state.biology = action.payload
      // stop loading
      state.biologyStatus.isLoadingBiology = false
    })
    builder.addCase(fetchPokemonBiology.rejected, (state, action) => {
      state.biologyStatus.error.status = action.payload.status
      state.biologyStatus.error.message = action.payload.data
      state.biologyStatus.isLoadingBiology = false
    })
  },
})

// export actions
export const { toggleStatus } = pokemonSlice.actions

// export reducer
export default pokemonSlice.reducer
