import { ProductActionTypes } from './actionTypes/productActionTypes'
import axios from 'axios'

// Actions for creating a product
export const createProductStart = () => ({
  type: ProductActionTypes.CREATE_PRODUCT_START,
})

export const createProductSuccess = product => ({
  type: ProductActionTypes.CREATE_PRODUCT_SUCCESS,
  payload: product,
})

export const createProductFailure = errorMessage => ({
  type: ProductActionTypes.CREATE_PRODUCT_FAILURE,
  payload: errorMessage,
})

export const createProduct = product => {
  return async (dispatch, getState) => {
    try {
      dispatch(createProductStart())

      const config = {
        headers: {
          Authorization: `Bearer ${ getState().currentUser.userInfo.token }`
        }
      }

      const { data } = await axios.post('/api/products', product, config)

      dispatch(createProductSuccess(data))
    } catch (error) {
      dispatch(createProductFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }
}

// Actions for fetching all products
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

// Actions for updating products
export const updateProductStart = () => ({
  type: ProductActionTypes.UPDATE_PRODUCT_START,
})

export const updateProductSuccess = updatedProduct => ({
  type: ProductActionTypes.UPDATE_PRODUCT_SUCCESS,
  payload: updatedProduct,
})

export const updateProductFailure = errorMessage => ({
  type: ProductActionTypes.UPDATE_PRODUCT_FAILURE,
  payload: errorMessage,
})

export const updateProduct = (productId, product) => {
  return async (dispatch, getState) => {
    try {
      dispatch(updateProductStart())

      const config = {
        headers: {
          Authorization: `Bearer ${ getState().currentUser.userInfo.token }`
        }
      }

      const { data } = await axios.put(`/api/products/${ productId }`, product, config)

      dispatch(updateProductSuccess(data))
    } catch (error) {
      dispatch(updateProductFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
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
