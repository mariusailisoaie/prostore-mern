import { combineReducers } from 'redux'

import productsReducer from './productsReducer'
import productDetailsReducer from './productDetailsReducer'
import cartReducer from './cartReducer'
import { userReducer, userDetailsReducer, updateUserProfileReducer } from './userReducer'

const rootReducer = combineReducers({
  productList: productsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  currentUser: userReducer,
  userProfileDetails: userDetailsReducer,
  updatedUserProfileDetails: updateUserProfileReducer,
})

export default rootReducer
