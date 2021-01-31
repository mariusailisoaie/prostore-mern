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

export const createOrder = order => {
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

// Actions for getting order by id
export const getOrderDetailsStart = () => ({
  type: OrderActionTypes.GET_ORDER_DETAILS_START
})

export const getOrderDetailsSuccess = order => ({
  type: OrderActionTypes.GET_ORDER_DETAILS_SUCCESS,
  payload: order,
})

export const getOrderDetailsFailure = errorMessage => ({
  type: OrderActionTypes.GET_ORDER_DETAILS_FAILURE,
  payload: errorMessage,
})

export const getOrderDetails = orderId => {
  return async (dispatch, getState) => {
    try {
      dispatch(getOrderDetailsStart())

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ getState().currentUser.userInfo.token }`
        }
      }

      const { data } = await axios.get(`/api/orders/${ orderId }`, config)

      dispatch(getOrderDetailsSuccess(data))
    } catch (error) {
      dispatch(getOrderDetailsFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }
}

// Actions for updating orders to paid
export const payOrderStart = () => ({
  type: OrderActionTypes.PAY_ORDER_START,
})

export const payOrderSuccess = paymentResult => ({
  type: OrderActionTypes.PAY_ORDER_SUCCESS,
  payload: paymentResult,
})

export const payOrderFailure = errorMessage => ({
  type: OrderActionTypes.PAY_ORDER_FAILURE,
  payload: errorMessage,
})

export const payOrder = (orderId, paymentResult) => {
  return async (dispatch, getState) => {
    try {
      dispatch(payOrderStart())

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ getState().currentUser.userInfo.token }`
        }
      }

      const { data } = await axios.put(`/api/orders/${ orderId }/pay`, paymentResult, config)

      dispatch(payOrderSuccess(data))
    } catch (error) {
      dispatch(payOrderFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }
}

// Actions for updating orders to DELIVERED
export const updateOrderToDeliveredStart = () => ({
  type: OrderActionTypes.UPDATE_ORDER_TO_DELIVERED_START,
})

export const updateOrderToDeliveredSuccess = order => ({
  type: OrderActionTypes.UPDATE_ORDER_TO_DELIVERED_SUCCESS,
  payload: order,
})

export const updateOrderToDeliveredFailure = errorMessage => ({
  type: OrderActionTypes.UPDATE_ORDER_TO_DELIVERED_FAILURE,
  payload: errorMessage,
})

export const updateOrderToDelivered = orderId => {
  return async (dispatch, getState) => {
    try {
      dispatch(updateOrderToDeliveredStart())

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ getState().currentUser.userInfo.token }`
        }
      }

      const { data } = await axios.put(`/api/orders/${ orderId }/deliver`, {}, config)

      dispatch(updateOrderToDeliveredSuccess(data))
    } catch (error) {
      dispatch(updateOrderToDeliveredFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }
}

// Actions for getting user orders
export const getUserOrdersStart = () => ({
  type: OrderActionTypes.GET_USER_ORDERS_START,
})

export const getUserOrdersSuccess = userOrders => ({
  type: OrderActionTypes.GET_USER_ORDERS_SUCCESS,
  payload: userOrders,
})

export const getUserOrdersFailure = errorMessage => ({
  type: OrderActionTypes.GET_USER_ORDERS_FAILURE,
  payload: errorMessage,
})

export const getUserOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(getUserOrdersStart())

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ getState().currentUser.userInfo.token }`
        }
      }

      const { data } = await axios.get('/api/orders/userorders', config)

      dispatch(getUserOrdersSuccess(data))
    } catch (error) {
      dispatch(getUserOrdersFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }
}

// Actions for getting all orders. Only for admins
export const getAllOrdersStart = () => ({
  type: OrderActionTypes.GET_ALL_ORDERS_START,
})

export const getAllOrdersSuccess = orders => ({
  type: OrderActionTypes.GET_ALL_ORDERS_SUCCESS,
  payload: orders,
})

export const getAllOrdersFailure = errorMessage => ({
  type: OrderActionTypes.GET_ALL_ORDERS_FAILURE,
  payload: errorMessage,
})

export const getAllOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(getAllOrdersStart())

      const config = {
        headers: {
          Authorization: `Bearer ${ getState().currentUser.userInfo.token }`
        }
      }

      const { data } = await axios.get('/api/orders', config)

      dispatch(getAllOrdersSuccess(data))
    } catch (error) {
      dispatch(getAllOrdersFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }
}
