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

// @desc    Create a review
// @route   POST /api/products/:id/reviews
// @access  Protected
const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  const { rating, comment } = req.body

  if (product) {
    const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()

    res.json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { createProduct, getProducts, getProductById, updateProduct, deleteProduct, deleteAllProducts, createProductReview }
