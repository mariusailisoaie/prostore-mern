import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { fetchProducts, deleteProduct } from '../actions/productActions'

const ProductsScreen = ({ history }) => {
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { products, isFetching, errorMessage } = productList

  const productDeleted = useSelector(state => state.productDeleted)
  const { successMessage: deleteProductSuccess, isFetching: deleteProductLoading, errorMessage: deleteProductErrorMessage } = productDeleted

  const currentUser = useSelector(state => state.currentUser)
  const { userInfo } = currentUser

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(fetchProducts())
    } else {
      history.push('/')
    }
  }, [dispatch, history, userInfo, deleteProductSuccess])

  const deleteProductHandler = productId => {
    if (window.confirm('Are you sure you want to delete the product?')) {
      dispatch(deleteProduct(productId))
    }
  }

  const createProductHandler = product => {
    // Create product
  }

  return (
    <div>
      <Row className='align-items-center'>
        <Col>Products</Col>

        <Col className='text-right'>
          <Button
            className='my-3'
            onClick={() => createProductHandler}
          >
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>

      {deleteProductErrorMessage && <Message variant='danger'>{deleteProductErrorMessage}</Message>}
      {isFetching || deleteProductLoading ? <Loader /> : errorMessage ? <Message variant='danger'>{errorMessage}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>NO.</th>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price} dkk</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${ product._id }/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() => deleteProductHandler(product._id)}>
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

export default ProductsScreen
