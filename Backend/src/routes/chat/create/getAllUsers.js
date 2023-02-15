import { User } from "../../../database/models/User.js";
import {noUserFoundError} from '../../../errors/index.js'
import createError from 'http-errors'

export const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.findAll({
            attributes: ['id', 'userName', 'image']
        })
        if (!allUsers.length){
            next(noUserFoundError)
        }
        else{
            res.json(allUsers)
        }
    } catch (error) {
        const sendedError = createError(400, error.message)
        next(sendedError)
    }
}