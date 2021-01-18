import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Create a product
// @route   POST /api/products
// @access  Protected/Admins
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: 'Sample name',
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    description: 'Sample product',
    rating: 0,
    numReviews: 0,
    price: 0,
    countInStock: 0,
  })

  const createdProduct = await product.save()

  res.status(201)
  res.json(createdProduct)
})

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a product
// @route   GET /api/products/:id
// @access  Protected/Admins
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()

    res.json({ message: 'Product removed successfully' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { createProduct, getProducts, getProductById, deleteProduct }
