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
  status: 'idle',
})

// Thunk functions
export const fetchPokemonList = createAsyncThunk(
  'home/fetchPokemonList',
  async (payload, { dispatch, rejectWithValue }) => {
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
    todoToggled(state, action) {
      const todoId = action.payload
      const todo = state.entities[todoId]
      todo.completed = !todo.completed
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        // replace all existing items
        state.pokemonList = action.payload
        // listAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
  },
})

export const { todoToggled } = homeSlice.actions

export default homeSlice.reducer
