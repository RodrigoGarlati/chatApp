import { Chat } from "../../../database/models/Chat.js";

export const getAllChats = async (req, res, next)=>{
    try {
        const chats = await Chat.findAll()
        res.send(chats)
    } catch (error) {
        res.json(error.message)
    }
}