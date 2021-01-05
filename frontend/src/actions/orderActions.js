import { OrderActionTypes } from './actionTypes/orderActionTypes'
import axios from 'axios'

// Actions for creating orders
export const createOrderStart = () => ({
  type: OrderActionTypes.CREATE_ORDER_START,
})

export const createOrderSuccess = createdOrder => ({
  type: OrderActionTypes.CREATE_ORDER_SUCCESS,
  payload: createdOrder,
})

export const createOrderFailure = errorMessage => ({
  type: OrderActionTypes.CREATE_ORDER_FAILURE,
  payload: errorMessage,
})

export const createOrderStartAsync = order => {
  return async (dispatch, getState) => {
    try {
      dispatch(createOrderStart())

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ getState().currentUser.userInfo.token }`
        }
      }

      const { data } = await axios.post(`/api/orders`, order, config)

      dispatch(createOrderSuccess(data))
    } catch (error) {
      dispatch(createOrderFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }
}
