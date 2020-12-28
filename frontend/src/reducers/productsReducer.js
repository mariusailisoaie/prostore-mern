import { ProductActionTypes } from '../actions/actionTypes/productActionTypes'

const INITIAL_STATE = {
  products: [],
  isFetching: false,
  errorMessage: '',
}

const productsReducer = (state = INITIAL_STATE, action) => {
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

export default productsReducer