import {Router} from "express";
import { createUser } from "./register/userRegister.js";
import { loginUser } from "./login/userLogin.js";

const router = Router()

router.post('/', createUser)

router.get('/', loginUser)

export default router