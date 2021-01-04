import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetailsStartAsync } from '../actions/userActions'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userProfileDetails = useSelector(state => state.userProfileDetails)
  const { userDetails, isFetching, errorMessage } = userProfileDetails

  const currentUser = useSelector(state => state.currentUser)
  const { userInfo } = currentUser

  useEffect(() => {
    if (!userInfo) {
      history.push('/signin')
    } else {
      if (!userDetails.name) {
        dispatch(getUserDetailsStartAsync('profile'))
      } else {
        setName(userDetails.name)
        setEmail(userDetails.email)
      }
    }
  }, [dispatch, history, userInfo, userDetails])

  const submitHandler = e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!')
    } else {
      // dispatch update user profile action
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>Profile</h2>

        {message && <Message variant='danger'>{message}</Message>}
        {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
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
      </Col>
    </Row>
  )
}

export default ProfileScreen
