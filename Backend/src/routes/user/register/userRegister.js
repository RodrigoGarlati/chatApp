import {User} from '../../../database/models/User.js'

export const createUser = async (req, res) => {
    const {userName, password, image} = req.body

    if (!userName || !password){
        res.status(400).send('Necessary data is missing')
    }
    else {
        try {
            const user = await User.create({userName, password, image})
            res.send(user)
        } catch (error) {
            res.status(400).send(error.message)
        }   
    }
}