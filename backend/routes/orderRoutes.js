import express from 'express'
const router = express.Router()
import protect from '../middleware/authMiddleware.js'
import { createOrder } from '../controllers/orderController.js'

router.route('/').post(protect, createOrder)

export default router
