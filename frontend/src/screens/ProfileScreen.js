import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetailsStartAsync, updateUserProfileStartAsync } from '../actions/userActions'
import { getUserOrdersStartAsync } from '../actions/orderActions'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userProfileDetails = useSelector(state => state.userProfileDetails)
  const { userDetails, isFetching, errorMessage } = userProfileDetails

  const updatedUserProfileDetails = useSelector(state => state.updatedUserProfileDetails)
  const { success } = updatedUserProfileDetails

  const currentUser = useSelector(state => state.currentUser)
  const { userInfo } = currentUser

  const userOrders = useSelector(state => state.userOrders)
  const { orders, isFetching: areUserOrdersFetching, errorMessage: userOrdersErrorMessage } = userOrders

  useEffect(() => {
    if (!userInfo) {
      history.push('/signin')
    } else {
      if (!userDetails.name) {
        dispatch(getUserDetailsStartAsync('profile'))
        dispatch(getUserOrdersStartAsync())
      } else {
        setName(userDetails.name)
        setEmail(userDetails.email)
        dispatch(getUserOrdersStartAsync())
      }
    }
  }, [dispatch, history, userInfo, userDetails])

  const submitHandler = e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!')
    } else {
      dispatch(updateUserProfileStartAsync({
        id: userDetails._id,
        name,
        email,
        password,
      }))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>Profile</h2>

        {message && <Message variant='danger'>{message}</Message>}
        {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
        {success && <Message variant='success'>Profile successfully updated!</Message>}
        {isFetching && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter full name'
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>Update Profile</Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>

        {
          areUserOrdersFetching ? <Loader /> : userOrdersErrorMessage ? <Message variant='danger'>{userOrdersErrorMessage}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  orders.map((order, index) => (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{order._id}</td>
                      <td>{order.createdAt.split('T')[0]}</td>
                      <td>{order.totalPrice} dkk</td>
                      <td>{order.isPaid ? order.paidAt.split('T')[0] : <i className='fa fa-times' style={{ color: 'red' }}></i>}</td>
                      <td>{order.isDelivered ? order.deliveredAt : <i className='fa fa-times' style={{ color: 'red' }}></i>}</td>
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
          )
        }
      </Col>
    </Row>
  )
}

export default ProfileScreen
