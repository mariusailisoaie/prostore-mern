import { combineReducers } from 'redux'

import productsReducer from './productsReducer'
import productDetailsReducer from './productDetailsReducer'
import cartReducer from './cartReducer'
import { userReducer, userDetailsReducer, updateUserProfileReducer, usersReducer } from './userReducer'
import { createOrderReducer, getOrderDetailsReducer, getUserOrdersReducer, payOrderReducer } from './orderReducer'

const rootReducer = combineReducers({
  productList: productsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  currentUser: userReducer,
  userProfileDetails: userDetailsReducer,
  updatedUserProfileDetails: updateUserProfileReducer,
  userList: usersReducer,
  createdOrder: createOrderReducer,
  orderDetails: getOrderDetailsReducer,
  orderPayStatus: payOrderReducer,
  userOrders: getUserOrdersReducer,
})

export default rootReducer
