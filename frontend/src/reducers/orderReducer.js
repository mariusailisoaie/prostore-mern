import { OrderActionTypes } from '../actions/actionTypes/orderActionTypes'

const INITIAL_STATE = {
  order: {},
  isFetching: false,
  errorMessage: '',
}

const createOrderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.CREATE_ORDER_START:
      return {
        ...state,
        isFetching: true,
      }
    case OrderActionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        success: true,
        isFetching: false,
        errorMessage: '',
      }
    case OrderActionTypes.CREATE_ORDER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

const getOrderDetailsReducer = (state = {
  order: {},
  isFetching: true,
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case OrderActionTypes.GET_ORDER_DETAILS_START:
      return {
        ...state,
        isFetching: true,
      }
    case OrderActionTypes.GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        order: action.payload,
        isFetching: false,
        errorMessage: '',
      }
    case OrderActionTypes.GET_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

export { createOrderReducer, getOrderDetailsReducer }
