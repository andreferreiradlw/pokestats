import { combineReducers } from 'redux'
// reducers
import homeReducer from '../src/components/Homepage/homeSlice'
import pokemonReducer from '../src/components/Pokemon/pokemonSlice'
import gameReducer from '../src/components/Header/gameSlice'
import typeReducer from '../src/components/Type/typeSlice'

const rootReducer = combineReducers({
  home: homeReducer,
  pokemon: pokemonReducer,
  game: gameReducer,
  type: typeReducer,
})

export default rootReducer
