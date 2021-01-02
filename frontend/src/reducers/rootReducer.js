import { combineReducers } from 'redux'

import productsReducer from './productsReducer'
import productDetailsReducer from './productDetailsReducer'
import cartReducer from './cartReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  productList: productsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  currentUser: userReducer,
})

export default rootReducer
