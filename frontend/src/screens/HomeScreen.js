import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { fetchProducts } from '../actions/productActions'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { products, isFetching, errorMessage } = productList

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div>
      <h1>Latest Products</h1>
      {
        isFetching ? <Loader /> : errorMessage ? <Message variant='danger'>{errorMessage}</Message> : <Row>
          {
            products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                <Product product={product} />
              </Col>
            ))
          }
        </Row>
      }
    </div>
  )
}

export default HomeScreen
