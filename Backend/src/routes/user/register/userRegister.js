import {User} from '../../../database/models/User.js'
import createError from 'http-errors'

export const createUser = async (req, res, next) => {
    const {userName, password, image} = req.body

    if (!userName || !password){
        const error = createError(400, 'Necessary data is missing')
        next(error)
    }
    else {
        try {
            let user
            if (!image){
                user = await User.create({userName, password})
            }
            else{
                user = await User.create({userName, password, image})
            }
            res.json('User created successfully')
        } catch (error) {
            const sendedError = createError(400, error)
            next(sendedError)
        }   
    }
}