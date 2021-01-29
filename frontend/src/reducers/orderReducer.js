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
    case OrderActionTypes.RESET_CREATED_ORDER:
      return {}
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

const getUserOrdersReducer = (state = {
  orders: {},
  isFetching: true,
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case OrderActionTypes.GET_USER_ORDERS_START:
      return {
        ...state,
        isFetching: true,
      }
    case OrderActionTypes.GET_USER_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        isFetching: false,
        errorMessage: '',
      }
    case OrderActionTypes.GET_USER_ORDERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

const payOrderReducer = (state = {
  isFetching: false,
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case OrderActionTypes.PAY_ORDER_START:
      return {
        ...state,
        isFetching: true,
      }
    case OrderActionTypes.PAY_ORDER_SUCCESS:
      return {
        ...state,
        success: true,
        isFetching: false,
        errorMessage: '',
      }
    case OrderActionTypes.PAY_ORDER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    case OrderActionTypes.PAY_ORDER_RESET:
      return {}
    default:
      return state
  }
}

const getAllOrdersReducer = (state = {
  orders: {},
  isFetching: true,
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case OrderActionTypes.GET_ALL_ORDERS_START:
      return {
        ...state,
        isFetching: true,
      }
    case OrderActionTypes.GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        isFetching: false,
        errorMessage: '',
      }
    case OrderActionTypes.GET_ALL_ORDERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

export { createOrderReducer, getOrderDetailsReducer, getUserOrdersReducer, payOrderReducer, getAllOrdersReducer }
