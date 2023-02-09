import { Chat } from "../../../database/models/Chat.js";
import { missingDataError } from "../../../errors/index.js";
import createError from "http-errors";

export const deleteChat = async (req, res, next)=>{
    const {chatId} = req.body
    console.log(chatId);
    if (!chatId){
        next(missingDataError)
    }
    else{
        try {
            const deletedStatus = await Chat.destroy({ 
                where: { id: chatId } 
            })

            res.json(deletedStatus)
        } catch (error) {
            const sendedError = createError(400, error.message) 
            next(sendedError)
        }
    }
}