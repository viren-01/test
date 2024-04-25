import express from 'express'
import UserController from './controller/UserController.js'

const router = express.Router()

router.post('/registerUser', UserController.registerUser)
router.get('/follow/', UserController.followUser)

export default router