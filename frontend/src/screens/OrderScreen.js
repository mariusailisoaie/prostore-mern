import React, { useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { getOrderDetailsStartAsync } from '../actions/orderActions'

const OrderScreen = ({ match }) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, isFetching, errorMessage } = orderDetails

  useEffect(() => {
    if (!order || order._id !== orderId)
      dispatch(getOrderDetailsStartAsync(orderId))
  }, [dispatch, order, orderId])

  return isFetching ? <Loader /> : errorMessage ? <Message variant='danger'>{errorMessage}</Message> : <Row>
    <Col md={8}>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>Shipping</h2>

          <p>
            <strong>Name: </strong> {order.user.name}
          </p>
          <p>
            <strong>Email: </strong>
            <a href={`mailto:${ order.user.email }`}>{order.user.email}</a>
          </p>

          <p>
            <strong>Address:</strong>
            {' '} {order.shippingAddress.address}, {order.shippingAddress.postalCode}, {order.shippingAddress.city}, {order.shippingAddress.country}
          </p>

          {order.isDelivered ? <Message variant='success'>Delivered on ${order.deliveredAt}</Message> : <Message variant='danger'>Not delivered</Message>}
        </ListGroup.Item>

        <ListGroup.Item>
          <h2>Payment Method</h2>
          <p>{order.paymentMethod}</p>
          {order.isPaid ? <Message variant='success'>Paid on ${order.paidAt}</Message> : <Message variant='danger'>Not paid</Message>}
        </ListGroup.Item>

        <ListGroup.Item>
          <h2>Order Items</h2>

          {order.orderItems.length === 0 ? <Message>Your order is empty</Message> : (
            <ListGroup variant='flush'>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>

                    <Col>
                      <Link to={`/product/${ item.productId }`}>{item.name}</Link>
                    </Col>

                    <Col md={4}>
                      {item.quantity} x {item.price} dkk = {item.quantity * item.price} dkk
                         </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </ListGroup.Item>
      </ListGroup>
    </Col>

    <Col md={4}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Order Summary</h2>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>Items</Col>
              <Col>{order.totalPrice - order.taxPrice} dkk</Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>Shipping</Col>
              <Col>{order.shippingPrice} dkk</Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>VAT 25%</Col>
              <Col>{order.taxPrice} dkk</Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>Total Price</Col>
              <Col>{order.totalPrice} dkk</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  </Row>
}

export default OrderScreen
