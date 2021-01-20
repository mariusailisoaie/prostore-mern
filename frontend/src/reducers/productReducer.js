import { ProductActionTypes } from '../actions/actionTypes/productActionTypes'

const INITIAL_STATE = {
  products: [],
  isFetching: false,
  errorMessage: '',
}

const createProductReducer = (state = {
  product: {},
  isFetching: false,
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case ProductActionTypes.CREATE_PRODUCT_START:
      return {
        ...state,
        isFetching: true,
      }
    case ProductActionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        success: true,
        isFetching: false,
        errorMessage: '',
      }
    case ProductActionTypes.CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false,
      }
    case ProductActionTypes.CREATE_PRODUCT_RESET:
      return {}
    default:
      return state
  }
}

const fetchProductsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS_START:
      return {
        ...state,
        isFetching: true,
      }
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        products: action.payload,
      }
    case ProductActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

const updateProductReducer = (state = {
  updatedProduct: {},
  success: false,
  isFetching: false,
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case ProductActionTypes.UPDATE_PRODUCT_START:
      return {
        ...state,
        isFetching: true,
      }
    case ProductActionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        updatedProduct: action.payload,
        success: action.payload,
        isFetching: false,
        errorMessage: '',
      }
    case ProductActionTypes.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    case ProductActionTypes.UPDATE_PRODUCT_RESET:
      return {}
    default:
      return state
  }
}

const deleteProductReducer = (state = {
  successMessage: '',
  isFetching: false,
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case ProductActionTypes.DELETE_PRODUCT_START:
      return {
        ...state,
        isFetching: true,
      }
    case ProductActionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        successMessage: action.payload,
      }
    case ProductActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

export { createProductReducer, fetchProductsReducer, updateProductReducer, deleteProductReducer }
