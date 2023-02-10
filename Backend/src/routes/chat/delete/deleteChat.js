import { Chat } from "../../../database/models/Chat.js";
import { missingDataError } from "../../../errors/index.js";
import createError from "http-errors";
import { io } from "../../../index.js";

export const deleteChat = async (req, res, next)=>{
    const {chatId} = req.body

    if (!chatId){
        next(missingDataError)
    }
    else{
        try {
            const deletedStatus = await Chat.destroy({ 
                where: { id: chatId } 
            })

            io.emit('chat', {
                event: 'deleted'
            })

            res.json(deletedStatus)
        } catch (error) {
            const sendedError = createError(400, error.message) 
            next(sendedError)
        }
    }
}