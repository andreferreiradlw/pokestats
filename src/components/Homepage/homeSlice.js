import axios from 'axios'
import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

const homeAdapter = createEntityAdapter()

const initialState = homeAdapter.getInitialState({
  pokemonList: [],
  loading: true,
})

// Thunk functions
export const fetchPokemonList = createAsyncThunk(
  'home/fetchPokemonList',
  async (payload, { dispatch, rejectWithValue }) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    try {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=20'
      )
      return response.data.results // Return a value synchronously using Async-await
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return rejectWithValue(err.response)
    }
  }
)

// slice
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    toggleStatus(state, action) {
      state.loading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonList.fulfilled, (state, action) => {
      state.pokemonList = action.payload.map((pokemon, index) => {
        pokemon.id = index += 1
        return pokemon
      })
      state.loading = false
    })
  },
})

export const { toggleStatus } = homeSlice.actions

export default homeSlice.reducer
