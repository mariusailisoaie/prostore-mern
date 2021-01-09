import express from 'express'
const router = express.Router()
import protect from '../middleware/authMiddleware.js'
import { createOrder, getOrderById, getUserOrders, updateOrderToPaid } from '../controllers/orderController.js'

router.route('/').post(protect, createOrder)
router.route('/userorders').get(protect, getUserOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
