import { UserActionTypes } from './actionTypes/userActionTypes'
import axios from 'axios'

// Actions for sign in
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

// Actions for sign up
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

// Actions for getting user details for profile screen
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

// Actions for updating user profile
export const updateUserProfileStart = () => ({
  type: UserActionTypes.UPDATE_USER_PROFILE_START,
})

export const updateUserProfileSuccess = updatedUserDetails => ({
  type: UserActionTypes.UPDATE_USER_PROFILE_SUCCESS,
  payload: updatedUserDetails,
})

export const updateUserProfileFailure = errorMessage => ({
  type: UserActionTypes.UPDATE_USER_PROFILE_FAILURE,
  payload: errorMessage,
})

export const updateUserProfileStartAsync = userDetails => {
  return async (dispatch, getState) => {
    try {
      dispatch(updateUserProfileStart())

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ getState().currentUser.userInfo.token }`
        }
      }

      const { data } = await axios.put('/api/user/profile', userDetails, config)

      dispatch(updateUserProfileSuccess(data))
    } catch (error) {
      dispatch(updateUserProfileFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }
}

// Action for sign out
export const signout = () => dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({ type: UserActionTypes.USER_LOGOUT })
  dispatch({ type: UserActionTypes.RESET_USER_DETAILS })
}
