import express from 'express'
import userRouter from './user/index.js'
import chatRouter from './chat/index.js'
import messageRouter from './message/index.js'

const router = express.Router()

router.use('/user', userRouter)

router.use('/chat', chatRouter)

router.use('/message', messageRouter)

export default router