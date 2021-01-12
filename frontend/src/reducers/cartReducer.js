import { CartActionTypes } from '../actions/actionTypes/cartActionTypes'

const INITIAL_STATE = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: '',
}

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find(cartItem => cartItem.productId === item.productId)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(cartItem => cartItem.productId === existItem.productId ? item : cartItem),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(cartItem => cartItem.productId !== action.payload),
      }
    case CartActionTypes.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CartActionTypes.SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case CartActionTypes.EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      }
    default:
      return state
  }
}

export default cartReducer
