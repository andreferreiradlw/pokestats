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
  moves: {
    isLoading: true,
    data: null,
  },
})

// Thunk functions
export const fetchTypeData = createAsyncThunk(
  'type/fetchTypeData',
  async (type, { dispatch, rejectWithValue }) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
      // console.log('type reponse!', response.data)
      // get moves
      dispatch(fetchTypeMoves(response.data.moves))
      // payload
      return response.data
    } catch (err) {
      // Use `err.response` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response)
    }
  }
)
export const fetchTypeMoves = createAsyncThunk(
  'type/fetchTypeMoves',
  async (moves, { rejectWithValue }) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    // console.log('moves!', moves)
    // requests array
    let moveRequests = []

    moves.forEach(move => {
      moveRequests.push(axios.get(move.url).catch(() => null))
    })

    try {
      const movesResponse = await axios.all(moveRequests).then(
        axios.spread((...responses) => {
          const movesData = responses
            .map(response => {
              if (response !== null) return response.data
            })
            .filter(Boolean)

          return movesData
        })
      )
      // payload
      return movesResponse
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
      state.isLoading = true
      state.moves.isLoading = true
    },
    cleanData(state) {
      state.data = {}
      state.isLoading = true
      state.error = {
        status: 'OK',
        message: null,
      }
      state.moves = {
        isLoading: true,
        data: null,
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
      state.data.pokemonListWithId = payload.pokemon
        .map(currPokemon => {
          // url
          const url = currPokemon.pokemon.url
          // get id from url and convert to number
          // eslint-disable-next-line
          const id = parseInt(url.match(/\/([^\/]+)\/?$/)[1])
          // if pokemon not gen 8
          if (id <= 809) {
            return {
              name: currPokemon.pokemon.name,
              id: id,
              url: currPokemon.pokemon.url,
              slot: currPokemon.slot,
            }
          }
        })
        .filter(Boolean)
      // stop loading
      state.isLoading = false
    })
    builder.addCase(fetchTypeData.rejected, (state, { payload }) => {
      // update error
      state.error.status = payload.status
      state.error.message = payload.data
    })
    // moves
    builder.addCase(fetchTypeMoves.pending, state => {
      state.moves.isLoading = true
    })
    builder.addCase(fetchTypeMoves.fulfilled, (state, { payload }) => {
      state.moves.data = payload
      state.moves.isLoading = false
    })
  },
})

// export actions
export const { startLoading, cleanData } = typeSlice.actions

// export reducer
export default typeSlice.reducer
