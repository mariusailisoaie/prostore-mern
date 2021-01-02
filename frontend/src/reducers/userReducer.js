import { UserActionTypes } from '../actions/actionTypes/userActionTypes'

const INITIAL_STATE = {
  userInfo: {},
  isFetching: false,
  errorMessage: '',
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN_START:
      return {
        ...state,
        isFetching: true,
      }
    case UserActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isFetching: false,
        errorMessage: '',
      }
    case UserActionTypes.USER_LOGIN_FAILURE:
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

export default userReducer
