import { UserActionTypes } from './actionTypes/userActionTypes'
import axios from 'axios'

export const userSignInStart = () => ({
  type: UserActionTypes.USER_SIGNIN_START,
})

export const userSignInSuccess = userInfo => ({
  type: UserActionTypes.USER_SIGNIN_SUCCESS,
  payload: userInfo,
})

export const userSignInFailure = errorMessage => ({
  type: UserActionTypes.USER_SIGNIN_FAILURE,
  payload: errorMessage,
})

export const userSignInStartAsync = (email, password) => {
  return async dispatch => {
    try {
      dispatch(userSignInStart())

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const { data } = await axios.post('/api/user/signin', { email, password }, config)

      dispatch(userSignInSuccess(data))

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch(userSignInFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }
}

export const userSignUpStart = () => ({
  type: UserActionTypes.USER_SIGNUP_START,
})

export const userSignUpSuccess = userInfo => ({
  type: UserActionTypes.USER_SIGNUP_SUCCESS,
  payload: userInfo,
})

export const userSignUpFailure = errorMessage => ({
  type: UserActionTypes.USER_SIGNUP_FAILURE,
  payload: errorMessage,
})

export const userSignUpStartAsync = (name, email, password) => {
  return async dispatch => {
    try {
      dispatch(userSignUpStart())

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const { data } = await axios.post('/api/user/signup', { name, email, password }, config)

      dispatch(userSignUpSuccess(data))

      dispatch(userSignInSuccess(data))

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch(userSignUpFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }
}

export const getUserDetailsStart = () => ({
  type: UserActionTypes.GET_USER_DETAILS_START,
})

export const getUserDetailsSuccess = userDetails => ({
  type: UserActionTypes.GET_USER_DETAILS_SUCCESS,
  payload: userDetails,
})

export const getUserDetailsFailure = errorMessage => ({
  type: UserActionTypes.GET_USER_DETAILS_FAILURE,
  payload: errorMessage,
})

export const getUserDetailsStartAsync = id => {
  return async (dispatch, getState) => {
    try {
      dispatch(getUserDetailsStart())

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ getState().currentUser.userInfo.token }`
        }
      }

      const { data } = await axios.get(`/api/user/${ id }`, config)

      dispatch(getUserDetailsSuccess(data))
    } catch (error) {
      dispatch(getUserDetailsFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }
}

export const signout = () => dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({ type: UserActionTypes.USER_LOGOUT })
}
