import { combineReducers } from 'redux'

import homeReducer from '../src/components/Homepage/homeSlice'

const rootReducer = combineReducers({
  home: homeReducer,
})

export default rootReducer
