import { User } from "../../../database/models/User.js";

export const editUser = async (req, res) => {
    const {id, userName, image, password} = req.body
    try {
        const userUpdated = await User.update({
            userName: userName,
            image: image,
            password: password
        }, {where: {id: id}});

        res.send(`User updated succesfully: ${userUpdated}`);
    } catch (error) {
        res.status(400).json(error.message);
    }
};
