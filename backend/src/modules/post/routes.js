import express from 'express'
import PostController from './controller/PostController.js'

const router = express.Router()

router.post('/create', PostController.createPost)
router.get('/post', PostController.getPosts)

export default router