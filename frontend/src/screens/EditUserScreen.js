import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { UserActionTypes } from '../actions/actionTypes/userActionTypes'

const EditUserScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userProfileDetails = useSelector(state => state.userProfileDetails)
  const { userDetails, isFetching, errorMessage } = userProfileDetails

  const updatedUser = useSelector(state => state.updatedUser)
  const { success: updateUserSuccess, isFetching: updateUserLoading, errorMessage: updateUserErrorMessage } = updatedUser

  useEffect(() => {
    if (updateUserSuccess) {
      dispatch({ type: UserActionTypes.UPDATE_USER_RESET })
      history.push('/admin/users')
    } else {
      if (!userDetails.name || userDetails._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(userDetails.name)
        setEmail(userDetails.email)
        setIsAdmin(userDetails.isAdmin)
      }
    }

  }, [dispatch, history, updateUserSuccess, userDetails, userId])

  const submitHandler = e => {
    e.preventDefault()

    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }

  return (
    <div>
      <Link to='/admin/users' className='btn btn-light my-3'>Go back</Link>

      <FormContainer>
        <h1>Edit user</h1>

        {updateUserLoading && <Loader />}
        {updateUserErrorMessage && <Message variant='danger'>{updateUserErrorMessage}</Message>}

        {
          isFetching ? <Loader /> : errorMessage ? <Message variant='danger'>{errorMessage}</Message> : (
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

              <Form.Group controlId='isadmin'>
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={e => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>
              <Button type='submit' variant='primary'>Update User</Button>
            </Form>
          )
        }
      </FormContainer>
    </div>
  )
}

export default EditUserScreen
