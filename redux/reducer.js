import { combineReducers } from 'redux'
// reducers
import homeReducer from '../src/components/Homepage/homeSlice'
import pokemonReducer from '../src/components/Pokemon/pokemonSlice'

const rootReducer = combineReducers({
  home: homeReducer,
  pokemon: pokemonReducer,
})

export default rootReducer
