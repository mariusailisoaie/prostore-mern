import { combineReducers } from 'redux'

import productsReducer from './productsReducer'
import productDetailsReducer from './productDetailsReducer'
import cartReducer from './cartReducer'
import { userReducer, userDetailsReducer, updateUserProfileReducer } from './userReducer'
import { createOrderReducer, getOrderDetailsReducer, payOrderReducer } from './orderReducer'

const rootReducer = combineReducers({
  productList: productsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  currentUser: userReducer,
  userProfileDetails: userDetailsReducer,
  updatedUserProfileDetails: updateUserProfileReducer,
  createdOrder: createOrderReducer,
  orderDetails: getOrderDetailsReducer,
  orderPayStatus: payOrderReducer,
})

export default rootReducer
