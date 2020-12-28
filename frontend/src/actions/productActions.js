import { ProductActionTypes } from './actionTypes/productActionTypes'
import axios from 'axios'

export const fetchProductsStart = () => ({
  type: ProductActionTypes.FETCH_PRODUCTS_START
})

export const fetchProductsSuccess = products => ({
  type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
})

export const fetchProductsFailure = errorMessage => ({
  type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
  payload: errorMessage,
})

export const fetchProductsStartAsync = () => {
  return async dispatch => {
    try {
      dispatch(fetchProductsStart())

      const { data } = await axios.get('/api/products')

      dispatch(fetchProductsSuccess(data))
    } catch (error) {
      dispatch(fetchProductsFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }
}