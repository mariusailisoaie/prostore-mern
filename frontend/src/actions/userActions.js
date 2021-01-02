import { UserActionTypes } from './actionTypes/userActionTypes'
import axios from 'axios'

export const userLoginStart = () => ({
  type: UserActionTypes.USER_LOGIN_START,
})

export const userLoginSuccess = userInfo => ({
  type: UserActionTypes.USER_LOGIN_SUCCESS,
  payload: userInfo,
})

export const userLoginFailure = errorMessage => ({
  type: UserActionTypes.USER_LOGIN_FAILURE,
  payload: errorMessage,
})

export const userLoginStartAsync = (email, password) => {
  return async dispatch => {
    try {
      dispatch(userLoginStart())

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const { data } = await axios.post('/api/user/login', { email, password }, config)

      dispatch(userLoginSuccess(data))

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch(userLoginFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }
}
