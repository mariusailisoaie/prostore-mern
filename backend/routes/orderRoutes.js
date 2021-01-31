import express from 'express'
const router = express.Router()
import { isAdmin, protect } from '../middleware/authMiddleware.js'
import { createOrder, getOrderById, getOrders, getUserOrders, updateOrderToPaid, updateOrderToDelivered } from '../controllers/orderController.js'

router.route('/').post(protect, createOrder).get(protect, isAdmin, getOrders)
router.route('/userorders').get(protect, getUserOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered)

export default router
