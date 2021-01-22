import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Create a product
// @route   POST /api/products
// @access  Protected/Admins
const createProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } = req.body

  const product = new Product({
    user: req.user._id,
    name,
    image,
    brand,
    category,
    description,
    price,
    countInStock,
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

// @desc    Delete all products
// @route   DELETE /api/products
// @access  Protected/Admins
const deleteAllProducts = asyncHandler(async (req, res) => {
  try {
    await Product.deleteMany()
    res.json({ message: 'All products removed successfully' })
  } catch (error) {
    res.status(500)
    throw new Error('Something went wrong. NO product was deleted')
  }
})

// @desc    Update a product
// @route   PUT /api/products
// @access  Protected/Admins
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  const { name, image, brand, category, description, price, countInStock } = req.body

  if (product) {
    product.name = name
    product.image = image
    product.brand = brand
    product.category = category
    product.description = description
    product.price = price
    product.countInStock = countInStock

    const updatedProduct = await product.save()

    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { createProduct, getProducts, getProductById, updateProduct, deleteProduct, deleteAllProducts }
