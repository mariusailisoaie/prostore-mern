import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getAllOrders, updateOrderToDelivered } from '../actions/orderActions'
import swap from 'pure-swap'

const OrdersScreen = ({ history }) => {
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.currentUser)
  const { userInfo } = currentUser

  const allOrders = useSelector(state => state.allOrders)
  const { orders, isFetching, errorMessage } = allOrders

  const orderDelivered = useSelector(state => state.orderDelivered)
  const { /* order: updatedOrder, */ success: orderUpdatedSuccessfully, isFetching: updateOrderToDeliveredLoading, errorMessage: updateOrderToDeliveredErrorMessage } = orderDelivered

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/signin')
    } else {
      dispatch(getAllOrders())
    }
  }, [dispatch, history, userInfo, orderUpdatedSuccessfully])

  const updateOrderToDeliveredHandler = orderId => {
    if (window.confirm('Are you sure you want to update the product?')) {
      dispatch(updateOrderToDelivered(orderId))
    }
  }

  return (
    <div>
      <h2>Orders</h2>

      {updateOrderToDeliveredErrorMessage && <Message variant='danger'>{errorMessage}</Message>}

      {isFetching || updateOrderToDeliveredLoading ? <Loader /> : errorMessage ? <Message variant='danger'>{errorMessage}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>NO.</th>
              <th>ID</th>
              <th>TOTAL</th>
              <th>VAT</th>
              <th>SHIPPING</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>UPDATE DELIVERED</th>
              <th>USER</th>
              <th>ITEMS</th>
              <th>ADDRESS</th>
              <th>PAYMENT METHOD</th>
              <th>CREATED AT</th>
              <th>UPDATED AT</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order._id}</td>
                  <td>{order.totalPrice} dkk</td>
                  <td>{order.taxPrice} dkk</td>
                  <td>{order.shippingPrice} dkk</td>
                  <td>{order.isPaid ? <i className='fas fa-check' style={{ color: 'green' }}></i> : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                  <td>{
                    order.paidAt ? swap(new Date(order.paidAt).toString().split('GMT')[0].substr(4).split(' '), 0, 1).join(' ') : 'Not paid'
                  }</td>
                  <td>{order.isDelivered ? <i className='fas fa-check' style={{ color: 'green' }} /> : <i className='fas fa-times' style={{ color: 'red' }} />}</td>
                  <th><Button
                    className='btn-sm'
                    variant='light'
                    onClick={() => updateOrderToDeliveredHandler(order._id)}
                    disabled={order.isDelivered}
                  >
                    Update
                  </Button></th>
                  <td>{order.user.name}</td>
                  <td>{order.orderItems.length}</td>
                  <td>{order.shippingAddress.address}, {order.shippingAddress.postalCode} {order.shippingAddress.city}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{swap(new Date(order.createdAt).toString().split('GMT')[0].substr(4).split(' '), 0, 1).join(' ')}</td>
                  <td>{swap(new Date(order.updatedAt).toString().split('GMT')[0].substr(4).split(' '), 0, 1).join(' ')}</td>
                  <td>
                    <LinkContainer to={`/order/${ order._id }`}>
                      <Button className='btn-sm' variant='light'>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default OrdersScreen
