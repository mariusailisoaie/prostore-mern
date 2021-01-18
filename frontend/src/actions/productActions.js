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

export const fetchProducts = () => {
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

// Actions for deleting products
export const deleteProductStart = () => ({
  type: ProductActionTypes.DELETE_PRODUCT_START,
})

export const deleteProductSuccess = successMessage => ({
  type: ProductActionTypes.DELETE_PRODUCT_SUCCESS,
  payload: successMessage,
})

export const deleteProductFailure = errorMessage => ({
  type: ProductActionTypes.DELETE_PRODUCT_FAILURE,
  payload: errorMessage,
})

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    try {
      dispatch(deleteProductStart())

      const config = {
        headers: {
          Authorization: `Bearer ${ getState().currentUser.userInfo.token }`
        }
      }

      const { data } = await axios.delete(`/api/products/${ productId }`, config)

      dispatch(deleteProductSuccess(data))
    } catch (error) {
      dispatch(deleteProductFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }
}
