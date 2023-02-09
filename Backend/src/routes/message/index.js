import { Router } from 'express'
import { getChatMessages } from './getall/getChatMessages.js'
import { sendMessage } from './send/sendMessage.js'

const router = Router()

router.get('/getmessages/:chatId', (req, res, next)=>{
    try {
        getChatMessages(req, res, next)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.post('/sendmessage', (req, res, next)=>{
    try {
        sendMessage(req, res, next)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

export default router