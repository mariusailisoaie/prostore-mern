import { UserActionTypes } from '../actions/actionTypes/userActionTypes'

const INITIAL_STATE = {
  userInfo: {},
  isFetching: false,
  errorMessage: '',
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.USER_SIGNIN_START:
      return {
        ...state,
        isFetching: true,
      }
    case UserActionTypes.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isFetching: false,
        errorMessage: '',
      }
    case UserActionTypes.USER_SIGNIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    case UserActionTypes.USER_SIGNUP_START:
      return {
        ...state,
        isFetching: true,
      }
    case UserActionTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isFetching: false,
        errorMessage: '',
      }
    case UserActionTypes.USER_SIGNUP_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    case UserActionTypes.USER_LOGOUT:
      return {}
    default:
      return state
  }
}

const userDetailsReducer = (state = {
  userDetails: {},
  isFetching: false,
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case UserActionTypes.GET_USER_DETAILS_START:
      return {
        ...state,
        isFetching: true
      }
    case UserActionTypes.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        isFetching: false,
        errorMessage: '',
      }
    case UserActionTypes.GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

export { userReducer, userDetailsReducer }
