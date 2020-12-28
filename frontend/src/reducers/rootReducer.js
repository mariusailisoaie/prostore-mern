import { combineReducers } from 'redux'

import productsReducer from './productsReducer'

const rootReducer = combineReducers({
  productList: productsReducer,
})

export default rootReducer