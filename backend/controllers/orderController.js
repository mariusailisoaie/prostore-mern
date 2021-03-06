import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Protected
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems.length && orderItems.length === 0) {
    res.status(400)
    throw new Error('No items in the order')
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by ID
// @route   GET /api/orders
// @access  Protected
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get all orders. Admins only
// @route   GET /api/orders
// @access  Protected/Admins
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')

  res.json(orders)
})

// @desc    Update order to paid
// @route   PUT /api/orders
// @access  Protected
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { id, status, update_time, email_address } = req.body

  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id,
      status,
      update_time,
      email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to delivered. Admins only
// @route   PUT /api/orders/:id/deliver
// @access  Protected/Admins
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user orders
// @route   PUT /api/orders/userorders
// @access  Protected
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })

  if (orders) {
    res.json(orders)
  } else {
    res.status(404)
    throw new Error('Orders not found')
  }
})

export { createOrder, getOrderById, updateOrderToPaid, updateOrderToDelivered, getUserOrders, getOrders }
