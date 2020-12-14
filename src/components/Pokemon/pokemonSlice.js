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
  data: null,
  loading: false,
  error: {
    status: 'OK',
    message: null,
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
      console.log(response)
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
      state.loading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonData.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchPokemonData.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
    })
    builder.addCase(fetchPokemonData.rejected, (state, action) => {
      state.error.status = action.payload.status
      state.error.message = action.payload.data
      state.loading = false
    })
  },
})

// export actions
export const { toggleStatus } = pokemonSlice.actions

// export reducer
export default pokemonSlice.reducer
