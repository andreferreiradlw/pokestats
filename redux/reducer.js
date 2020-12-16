import { combineReducers } from 'redux'
// reducers
import homeReducer from '../src/components/Homepage/homeSlice'
import pokemonReducer from '../src/components/Pokemon/pokemonSlice'
import gameReducer from '../src/components/Header/gameSlice'

const rootReducer = combineReducers({
  home: homeReducer,
  pokemon: pokemonReducer,
  game: gameReducer,
})

export default rootReducer
