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
  biology: {
    data: null,
    isLoading: true,
    error: {
      status: 'OK',
      message: null,
    },
  },
  info: {
    data: null,
    isLoading: true,
    error: {
      status: 'OK',
      message: null,
    },
  },
  evolution: {
    data: null,
    isLoading: true,
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
    try {
      const response = await axios.get(biologyUrl)
      console.log('biology', response.data)
      // get evolution
      dispatch(fetchPokemonEvolution(response.data.evolution_chain.url))
      return response.data
    } catch (err) {
      // Use `err.response` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response)
    }
  }
)
export const fetchPokemonEvolution = createAsyncThunk(
  'home/fetchPokemonEvolution',
  async (evolutionUrl, { rejectWithValue }) => {
    try {
      const response = await axios.get(evolutionUrl)
      console.log('evolution', response.data)
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
      state.info.isLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    // info
    builder.addCase(fetchPokemonData.pending, ({ info }) => {
      info.isLoading = true
    })
    builder.addCase(fetchPokemonData.fulfilled, ({ info }, { payload }) => {
      info.data = payload
      // stop loading
      info.isLoading = false
    })
    builder.addCase(fetchPokemonData.rejected, ({ info }, { payload }) => {
      // update error
      info.error.status = payload.status
      info.error.message = payload.data
    })
    // biology
    builder.addCase(fetchPokemonBiology.pending, ({ biology }) => {
      biology.isLoading = true
    })
    builder.addCase(
      fetchPokemonBiology.fulfilled,
      ({ biology }, { payload }) => {
        biology.data = payload
        // stop loading
        biology.isLoading = false
      }
    )
    builder.addCase(
      fetchPokemonBiology.rejected,
      ({ biology }, { payload }) => {
        // update error
        biology.error.status = payload.status
        biology.error.message = payload.data
      }
    )
    // evolution
    builder.addCase(fetchPokemonEvolution.pending, ({ evolution }) => {
      evolution.isLoading = true
    })
    builder.addCase(
      fetchPokemonEvolution.fulfilled,
      ({ evolution }, { payload }) => {
        evolution.data = payload
        // stop loading
        evolution.isLoading = false
      }
    )
    builder.addCase(
      fetchPokemonEvolution.rejected,
      ({ evolution }, { payload }) => {
        // update error
        evolution.error.status = payload.status
        evolution.error.message = payload.data
      }
    )
  },
})

// export actions
export const { toggleStatus } = pokemonSlice.actions

// export reducer
export default pokemonSlice.reducer
