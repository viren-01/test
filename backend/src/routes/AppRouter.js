import express from 'express'
import userRouter from '../modules/user/routes.js'
import postRouter from '../modules/post/routes.js'
import PostController from '../modules/post/controller/PostController.js'

const router = express.Router()

router.use('/user', userRouter)
router.use('/post', postRouter)
router.get('/timeline', PostController.fetchTimeline)


export default router 