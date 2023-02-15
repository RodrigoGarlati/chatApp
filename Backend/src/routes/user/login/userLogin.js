import {User} from '../../../database/models/User.js'
import {missingDataError, noUserFoundError} from '../../../errors/index.js'
import createError from 'http-errors'
import { Chat } from '../../../database/models/Chat.js'

export const loginUser = async (req, res, next) => {
    const {userName, password} = req.body
    
    if (!userName || !password){
        next(missingDataError)
    }
    else{
        try {
            const userSearched = await User.findOne({where: {userName: userName}})
            if (userSearched === null){
                next(noUserFoundError)
            }
            else if (userSearched.password !== password){
                const error = createError(400, 'Incorrect password')
                next(error)
            }
            else{
                res.json({id : userSearched.id})
            }
        } catch (error) {
            const sendError = createError(400, error.message)
            next(sendError)
        }
    }
}

export const getUserData = async (req, res, next) => {
    const {id} = req.params

    if (!id){
        next(missingDataError)
    }
    else{
        try {
            const loggedUser = await User.findByPk(id, {
                attributes: ['id', 'userName', 'image'],
                include: {
                    model: Chat,
                    attributes: ['id']
                }
            }) 
            if (loggedUser){
                let usersChatted = []
                for (let i in loggedUser.chats){
                    const chatId = loggedUser.chats[i].id
                    let chatFound = await Chat.findByPk(chatId)
                    let usersOfChat = await chatFound.getUsers()
                    usersChatted.push(usersOfChat.find( user => user.id !== loggedUser.id)) 
                }

                res.json({loggedUser, usersChatted})
            }
            else {
                next(noUserFoundError)
            }
        } catch (error) {
            const sendedError = createError(400, error.message)
            next(sendedError)
        }
    }
}