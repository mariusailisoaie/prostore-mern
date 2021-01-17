import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { userSignIn } from '../actions/userActions'

const SignInScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.currentUser)
  const { userInfo, isFetching, errorMessage } = currentUser

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = e => {
    e.preventDefault()

    dispatch(userSignIn(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>

      {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
      {isFetching && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Adderss</Form.Label>
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

        <Button type='submit' variant='primary'>Sign In</Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer? {' '} <Link to={redirect ? `/signup?redirect=${ redirect }` : '/signup'}>Sign up</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default SignInScreen
