import {User} from '../../../database/models/User.js'

export const loginUser = async (req, res) => {
    const {userName, password} = req.body
    
    if (!userName || !password){
        res.status(400).send('Necessary data is missing')
    }
    else{
        try {
            const userSearched = await User.findOne({where: {userName: userName}})
            if (userSearched === null){
                res.status(400).send('No user was founded')
            }
            else if (userSearched.password !== password){
                res.status(400).send('Incorrect password')
            }
            else{
                res.send(userSearched)
            }
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}