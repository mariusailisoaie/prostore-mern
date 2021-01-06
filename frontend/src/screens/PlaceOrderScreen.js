import React, { useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'
import { createOrderStartAsync } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)

  const { shippingAddress: { address, postalCode, city, country } } = cart

  // Calculate prices
  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
  cart.shippingPrice = cart.itemsPrice > 1000 ? 0 : 49
  cart.taxPrice = 0.25 * cart.itemsPrice
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

  const createdOrder = useSelector(state => state.createdOrder)
  const { order, success, errorMessage } = createdOrder

  useEffect(() => {
    if (success) history.push(`/order/${ order._id }`)

    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(createOrderStartAsync({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }))
  }

  return (
    errorMessage ? <Message variant='danger'>{errorMessage}</Message> :
      <div>
        <CheckoutSteps step1 step2 step3 step4 />

        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address:</strong>
                  {' '} {address}, {postalCode}, {city}, {country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>{cart.paymentMethod}</p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>

                {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                  <ListGroup variant='flush'>
                    {cart.cartItems.map((item, index) => (
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
                    <Col>{cart.itemsPrice} dkk</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{cart.shippingPrice} dkk</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>VAT 25%</Col>
                    <Col>{cart.taxPrice} dkk</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total Price</Col>
                    <Col>{cart.totalPrice} dkk</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
  )
}

export default PlaceOrderScreen
