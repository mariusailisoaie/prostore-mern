import { combineReducers } from 'redux'

import productsReducer from './productsReducer'
import productDetailsReducer from './productDetailsReducer'
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
  productList: productsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
})

export default rootReducer
