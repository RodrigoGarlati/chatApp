import { User } from "../../../database/models/User.js";
import { Chat } from "../../../database/models/Chat.js";
import { missingDataError, noUserFoundError } from "../../../errors/index.js";
import createError from "http-errors";
import {io} from '../../../index.js'

export const createChat = async (req, res, next) => {
    const {loggedUserId, otherUserId} = req.body

    if (!loggedUserId || !otherUserId){
        next(missingDataError)
    }
    else{
        try {
            const loggedUser = await User.findByPk(loggedUserId)
            const otherUser = await User.findByPk(otherUserId)
            
            if(!loggedUser || !otherUser){
                next(noUserFoundError)
            }
            else{
                const newChat = await Chat.create()
                newChat.addUsers([loggedUser, otherUser])

                io.emit('chat', {
                    event: 'created'
                })

                res.json('Chat created succesfully.')
            }
        } catch (error) {
            const sendedError = createError(400, error.message)
            next(sendedError)
        }
    }
}