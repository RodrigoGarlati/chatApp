import { Message } from "../../../database/models/Message.js"
import { Chat } from "../../../database/models/Chat.js"
import { missingDataError } from "../../../errors/index.js"
import createError from 'http-errors'

export const sendMessage= async (req, res, next)=>{
    const {text, transmitter, receiver, chatId} = req.body

    if(!text, !transmitter, !receiver){
        next(missingDataError)
    }
    else{
        try {
            const messageStatus = await Message.create({
                text,
                transmitter,
                receiver
            })
            const chat = await Chat.findByPk(chatId)
            messageStatus.setChat(chat)
            res.json(messageStatus)
        } catch (error) {
            const sendedError = createError(400, error.message)
            next(sendedError) 
        }
    }
}