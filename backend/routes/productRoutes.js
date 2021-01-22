import express from 'express'
const router = express.Router()
import { protect, isAdmin } from '../middleware/authMiddleware.js'
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts
} from '../controllers/productController.js'

router.route('/').get(getProducts).post(protect, isAdmin, createProduct).delete(protect, isAdmin, deleteAllProducts)
router.route('/:id').get(getProductById).put(protect, isAdmin, updateProduct).delete(protect, isAdmin, deleteProduct)

export default router
