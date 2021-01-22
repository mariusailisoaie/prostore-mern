import { combineReducers } from 'redux'

import {
  createProductReducer,
  fetchProductsReducer,
  updateProductReducer,
  deleteProductReducer,
  deleteAllProductsReducer
} from './productReducer'
import productDetailsReducer from './productDetailsReducer'
import cartReducer from './cartReducer'
import {
  userReducer,
  userDetailsReducer,
  updateUserProfileReducer,
  getUsersReducer,
  deleteUserReducer,
  updateUserReducer
} from './userReducer'
import {
  createOrderReducer,
  getOrderDetailsReducer,
  getUserOrdersReducer,
  payOrderReducer
} from './orderReducer'

const rootReducer = combineReducers({
  productList: fetchProductsReducer,
  productDeleted: deleteProductReducer,
  productDetails: productDetailsReducer,
  createdProduct: createProductReducer,
  productUpdated: updateProductReducer,
  allProductsDeleted: deleteAllProductsReducer,
  cart: cartReducer,
  currentUser: userReducer,
  userProfileDetails: userDetailsReducer,
  updatedUserProfileDetails: updateUserProfileReducer,
  userList: getUsersReducer,
  userDeleted: deleteUserReducer,
  updatedUser: updateUserReducer,
  createdOrder: createOrderReducer,
  orderDetails: getOrderDetailsReducer,
  orderPayStatus: payOrderReducer,
  userOrders: getUserOrdersReducer,
})

export default rootReducer
