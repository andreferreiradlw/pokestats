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
  loading: false,
  filteredList: [],
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
        'https://pokeapi.co/api/v2/pokemon?limit=151'
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
    filterPokemon(state, action) {
      if (action.payload) {
        state.filteredList = Object.values(state.entities).filter((pokemon) =>
          pokemon.name.includes(action.payload)
        )
      } else {
        // set filtered state to empty array
        state.filteredList = []
      }
    },
    toggleLoading(state, action) {
      state.loading = !state.loading
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonList.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchPokemonList.fulfilled, (state, action) => {
      const listWithId = action.payload.map((pokemon, index) => {
        pokemon.id = index += 1
        return pokemon
      })
      homeAdapter.setAll(state, listWithId)
      state.loading = false
    })
    builder.addCase(fetchPokemonList.rejected, (state, action) => {
      state.error.status = action.payload.status
      state.error.message = action.payload.data
      state.loading = false
    })
  },
})

// export actions
export const { filterPokemon, toggleLoading } = homeSlice.actions

// export reducer
export default homeSlice.reducer
