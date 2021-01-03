import express from 'express'
const router = express.Router()
import protect from '../middleware/authMiddleware.js'
import { authUser, getUserProfile, signUpUser } from '../controllers/userController.js'

router.route('/signup').post(signUpUser)
router.post('/signin', authUser)
router.route('/profile').get(protect, getUserProfile)

export default router
