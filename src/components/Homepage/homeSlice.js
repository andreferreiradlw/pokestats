import axios from 'axios'
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

// entity adapter
const homeAdapter = createEntityAdapter()

// initial state
const initialState = homeAdapter.getInitialState({
  isLoading: true,
  pokemon: [],
  pokemonLength: 0,
  error: {
    status: 'OK',
    message: null,
  },
})

// Thunk functions
export const fetchPokemonList = createAsyncThunk(
  'home/fetchPokemonList',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=809'
      )
      return response.data.results
    } catch (err) {
      // Use `err.response` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response)
    }
  }
)

// slice
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true
      state.error = {
        status: 'OK',
        message: null,
      }
    },
    stopLoading(state) {
      state.isLoading = false
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPokemonList.pending, state => {
      state.isLoading = true
    })
    builder.addCase(fetchPokemonList.fulfilled, (state, action) => {
      const listWithId = action.payload.map((pokemon, index) => {
        pokemon.id = index += 1
        return pokemon
      })
      state.pokemon = listWithId
      state.pokemonLength = listWithId.length
      state.isLoading = false
    })
    builder.addCase(fetchPokemonList.rejected, (state, action) => {
      state.error.status = action.payload.status
      state.error.message = action.payload.data
      state.isLoading = false
    })
  },
})

// export actions
export const { startLoading, stopLoading } = homeSlice.actions

// export reducer
export default homeSlice.reducer
