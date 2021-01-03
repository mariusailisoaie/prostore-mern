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

export const signout = () => dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({ type: UserActionTypes.USER_LOGOUT })
}
