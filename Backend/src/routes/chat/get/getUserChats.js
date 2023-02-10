import { Chat } from "../../../database/models/Chat.js";
import { User } from "../../../database/models/User.js";
import { missingDataError } from "../../../errors/index.js";
import createError from 'http-errors'
import { Op } from "sequelize";

export const getUserChats = async (req, res, next)=>{
    const {userId} = req.params

    if(!userId){
        next(missingDataError)
    }
    else{
        try {
            const chats = await Chat.findAll({
                include: {
                    model: User,
                    attributes: ['id', 'userName', 'image'],
                }
            })

            let usersChatted = []

            if (chats){
                for (let i in chats){
                    if (chats[i].users.find((user) => user.id == userId )){
                        let userChatted = chats[i].users.findIndex(user => user.id !== parseInt(userId))
                        userChatted !== -1? usersChatted.push(chats[i].users[userChatted]) : null
                    }
                }
            }
            res.json(usersChatted)
        } catch (error) {
            const sendedError = createError(400, error.message)
            next(sendedError)
        }
    }
}