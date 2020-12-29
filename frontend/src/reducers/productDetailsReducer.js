import { ProductDetailsActionTypes } from '../actions/actionTypes/productDetailsActionTypes'

const INITIAL_STATE = {
  product: { reviews: [] },
  isFetching: false,
  errorMessage: '',
}

const productDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductDetailsActionTypes.FETCH_PRODUCT_DETAILS_START:
      return {
        ...state,
        isFetching: true,
      }
    case ProductDetailsActionTypes.FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        product: action.payload,
      }
    case ProductDetailsActionTypes.FETCH_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

export default productDetailsReducer
