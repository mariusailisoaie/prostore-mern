import express from 'express'
const router = express.Router()
import protect from '../middleware/authMiddleware.js'
import { createOrder, getOrderById } from '../controllers/orderController.js'

router.route('/').post(protect, createOrder)
router.route('/:id').get(protect, getOrderById)

export default router
