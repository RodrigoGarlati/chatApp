import createError from "http-errors"
import { Message } from "../../../database/models/Message.js"
import { missingDataError } from "../../../errors/index.js"

export const getChatMessages = async (req, res, next)=>{
    const {chatId} = req.params

    if (!chatId){
        next(missingDataError)
    }
    else{
        try {
            const messagesData = await Message.findAll({
                where: {chatId: chatId},
                order: [
                    ['id', 'ASC']
                ]
            })
            res.json(messagesData)
        } catch (error) {
            const sendedError = createError(400, error.message)
            next(sendedError)
        }
    }
}