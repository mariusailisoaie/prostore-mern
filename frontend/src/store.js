import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const currentUserFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage, shippingAddress: shippingAddressFromLocalStorage },
  currentUser: { userInfo: currentUserFromLocalStorage },
}

const middlewares = [thunk]

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store
