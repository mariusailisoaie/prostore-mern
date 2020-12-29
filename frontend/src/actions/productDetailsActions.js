import { ProductDetailsActionTypes } from './actionTypes/productDetailsActionTypes'
import axios from 'axios'

export const fetchProductDetailsStart = () => ({
  type: ProductDetailsActionTypes.FETCH_PRODUCT_DETAILS_START,
})

export const fetchProductDetailsSuccess = product => ({
  type: ProductDetailsActionTypes.FETCH_PRODUCT_DETAILS_SUCCESS,
  payload: product,
})

export const fetchProductDetailsFailure = errorMessage => ({
  type: ProductDetailsActionTypes.FETCH_PRODUCT_DETAILS_FAILURE,
  payload: errorMessage,
})

export const fetchProductDetailsStartAsync = id => {
  return async dispatch => {
    try {
      dispatch(fetchProductDetailsStart())

      const { data } = await axios.get(`/api/products/${ id }`)

      dispatch(fetchProductDetailsSuccess(data))
    } catch (error) {
      dispatch(fetchProductDetailsFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }
}
