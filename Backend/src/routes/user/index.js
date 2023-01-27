import {Router} from "express";
import { createUser } from "./register/userRegister.js";
import { loginUser } from "./login/userLogin.js";
import { editUser } from "./edit/editUser.js";

const router = Router();

router.post('/', createUser);

router.get('/', loginUser);

router.put('/', editUser);

export default router