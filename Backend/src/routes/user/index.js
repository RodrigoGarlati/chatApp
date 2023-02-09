import {Router} from "express";
import { createUser } from "./register/userRegister.js";
import { loginUser, getUserData } from "./login/userLogin.js";
import { editUser } from "./edit/editUser.js";

const router = Router();

router.post('/register', (req, res, next)=>{
    try {
        createUser(req,res,next)
    } catch (error) {
        res.status(400).json(error.message)
    }
});

router.post('/login', (req, res, next)=>{
    try {
        loginUser(req,res,next)
    } catch (error) {
        res.status(400).json(error.message)
    }
});

router.get('/getuser/:id', (req, res, next)=> {
    try {
        getUserData(req, res, next)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.put('/edit', (req, res, next)=>{
    try {
        editUser(req,res,next)
    } catch (error) {
        res.status(400).json(error.message)
    }
});

export default router