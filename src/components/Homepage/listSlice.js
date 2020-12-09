import axios from 'axios'
import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

const listAdapter = createEntityAdapter()

const initialState = listAdapter.getInitialState({
  results: [],
  status: 'idle',
})

// Thunk functions
export const fetchPokemon = createAsyncThunk(
  'list/fetchPokemon',
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
const listSlice = createSlice({
  name: 'list',
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
      .addCase(fetchPokemon.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        // replace all existing items
        state.results = action.payload
        // listAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
  },
})

export const { todoToggled } = listSlice.actions

export default listSlice.reducer
