import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { fetchProductDetails } from '../actions/productDetailsActions'
import { updateProduct } from '../actions/productActions'
import { ProductActionTypes } from '../actions/actionTypes/productActionTypes'

const EditProductScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)

  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.currentUser)
  const { userInfo } = currentUser

  const productDetails = useSelector(state => state.productDetails)
  const { product, isFetching, errorMessage } = productDetails

  const productUpdated = useSelector(state => state.productUpdated)
  const { updatedProduct, success: updateProductSuccess, isFetching: updateProductLoading, errorMessage: updateProductErrorMessage } = productUpdated

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/signin')
    }

    if (updateProductSuccess) {
      history.push('/admin/products')
      dispatch({ type: ProductActionTypes.UPDATE_PRODUCT_RESET })
      dispatch(fetchProductDetails(productId))
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(fetchProductDetails(productId))
      } else {
        setName(product.name)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setDescription(product.description)
        setPrice(product.price)
        setCountInStock(product.countInStock)
      }
    }
  }, [dispatch, history, product, productId, userInfo, updatedProduct, updateProductSuccess])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(updateProduct(productId, { name, image, brand, category, description, price, countInStock }))
  }

  return (
    <div>
      <Link to='/admin/products' className='btn btn-light my-3'>Go back</Link>

      <FormContainer>
        <h1>Edit product</h1>

        {updateProductErrorMessage && <Message variant='danger'>{updateProductErrorMessage}</Message>}

        {
          isFetching || updateProductLoading ? <Loader /> : errorMessage ? <Message variant='danger'>{errorMessage}</Message> : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='productname'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter product name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter image path'
                  value={image}
                  onChange={e => setImage(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter brand'
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter description'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='countinstock'>
                <Form.Label>Count in stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter count in stock'
                  value={countInStock}
                  onChange={e => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>Update product</Button>
            </Form>
          )
        }
      </FormContainer>
    </div>
  )
}

export default EditProductScreen
