import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUsers } from '../actions/userActions'

const UsersScreen = () => {
  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { users, isFetching, errorMessage } = userList

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const deleteUserHandler = userId => {
    console.log('deleteUserHandler')
  }
  return (
    <div>
      <h1>Users</h1>

      {isFetching ? <Loader /> : errorMessage ? <Message variant='danger'>{errorMessage}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td><a href={`mailto:${ user.name }`}>{user.name}</a></td>
                  <td>
                    {
                      user.isAdmin ? <i className='fas fa-check' style={{ color: 'green' }}></i> : <i className='fas fa-times' style={{ color: 'red' }}></i>
                    }
                  </td>
                  <td>
                    <LinkContainer to={`/user/${ user._id }/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() => deleteUserHandler(user._id)}>
                      <i className='fas fa-trash'></i>
                    </Button>
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

export default UsersScreen
