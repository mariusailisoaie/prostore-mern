import { CartActionTypes } from './actionTypes/cartActionTypes'
import axios from 'axios'


export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${ id }`)

  dispatch({
    type: CartActionTypes.ADD_ITEM,
    payload: {
      productId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = id => (dispatch, getState) => {
  dispatch({
    type: CartActionTypes.REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = shippingAddress => (dispatch) => {
  dispatch({
    type: CartActionTypes.SAVE_SHIPPING_ADDRESS,
    payload: shippingAddress,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress))
}

export const savePaymentMethod = paymentMethod => (dispatch) => {
  dispatch({
    type: CartActionTypes.SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
}

export const emptyCart = () => dispatch => {
  dispatch({
    type: CartActionTypes.EMPTY_CART,
  })

  localStorage.removeItem('cartItems')
}
