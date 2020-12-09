import { combineReducers } from 'redux'

import listReducer from '../src/components/Homepage/listSlice'

const rootReducer = combineReducers({
  list: listReducer,
})

export default rootReducer
