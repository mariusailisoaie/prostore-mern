import express from 'express'
const router = express.Router()
import { protect, isAdmin } from '../middleware/authMiddleware.js'
import { authUser, getUserProfile, signUpUser, updateUserProfile, getUsers, deleteUser, getUserById } from '../controllers/userController.js'

router.route('/signup').post(signUpUser)
router.post('/signin', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/').get(protect, isAdmin, getUsers)
router.route('/:id').delete(protect, isAdmin, deleteUser).get(protect, isAdmin, getUserById)

export default router
