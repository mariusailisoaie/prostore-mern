import { UserActionTypes } from '../actions/actionTypes/userActionTypes'

const INITIAL_STATE = {
  userInfo: {},
  isFetching: false,
  errorMessage: '',
}

// Reducer for user sign in, sign up and log out
// TODO: refactor/improve/maybe split this reducer this reducer
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
    case UserActionTypes.RESET_USER_DETAILS:
      return {
        ...state,
        userDetails: {},
      }
    default:
      return state
  }
}

const updateUserProfileReducer = (state = {
  userDetails: {},
  isFetching: false,
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case UserActionTypes.UPDATE_USER_PROFILE_START:
      return {
        ...state,
        isFetching: true,
      }
    case UserActionTypes.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        success: true,
        isFetching: false,
        errorMessage: '',
      }
    case UserActionTypes.UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

const usersReducer = (state = {
  users: [],
  isFetching: false,
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case UserActionTypes.GET_USERS_START:
      return {
        ...state,
        isFetching: true
      }
    case UserActionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isFetching: false,
        errorMessage: '',
      }
    case UserActionTypes.GET_USERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

export { userReducer, userDetailsReducer, updateUserProfileReducer, usersReducer }
