import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { createProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ProductActionTypes } from '../actions/actionTypes/productActionTypes'
import axios from 'axios'

const CreateProductScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [imageName, setImageName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.currentUser)
  const { userInfo } = currentUser

  const createdProduct = useSelector(state => state.createdProduct)
  const { success: createProductSuccess, isFetching, errorMessage } = createdProduct

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/signin')
    } else {
      if (createProductSuccess) {
        history.push('/admin/products')
        dispatch({ type: ProductActionTypes.CREATE_PRODUCT_RESET })
      }
    }

  }, [dispatch, history, userInfo, createProductSuccess])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(createProduct({
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
    }))
  }

  const uploadProductImageHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('productImage', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post('/api/upload', formData, config)

      let pathArray = data.files.productImage.path.split('/')
      const imagePath = '/' + pathArray.slice(Math.max(pathArray.length - 2, 0)).join('/')

      setImageName(data.files.productImage.name)
      setImage(imagePath)
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }
  }

  return (
    <div>
      <Link to='/admin/products' className='btn btn-light my-3'>Go back</Link>

      {
        isFetching ? <Loader /> : errorMessage ? <Message variant='danger'>{errorMessage}</Message> : <FormContainer>
          <h1>Create Product</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group controlId='productname'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product name'
                required
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.File
                id='image-file'
                name='image'
                label={imageName || 'Choose product image'}
                custom
                onChange={uploadProductImageHandler}
              ></Form.File>

              {uploading && <Loader />}
            </Form.Group>


            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                required
                onChange={e => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                required
                onChange={e => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                required
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                required
                onChange={e => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countinstock'>
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                required
                onChange={e => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Create product</Button>
          </Form>
        </FormContainer>
      }
    </div>
  )
}

export default CreateProductScreen
