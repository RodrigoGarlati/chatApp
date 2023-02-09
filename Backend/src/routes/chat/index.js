import { Router } from "express";
import { createChat } from "./create/createChat.js";
import { getAllChats } from "./create/getAllChats.js";
import { getAllUsers } from "./create/getAllUsers.js";
import { deleteChat } from "./delete/deleteChat.js";

const router = Router()

router.get('/getallusers', (req, res, next)=>{
    try {
        getAllUsers(req, res, next)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.post('/createchat', (req, res, next)=>{
    try {
        createChat(req, res, next)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.delete('/deletechat', (req, res, next)=>{
    try {
        deleteChat(req, res, next)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.get('/getallchats', (req,res,next)=>{
    try{
        getAllChats(req,res,next)
    }
    catch(error){
        res.status(400).json(error.message)
    }
})

export default router