import { Router } from "express";
import { protect, signIn, signUpCompany, signUpUser } from "../controllers/auth.controller";


const router = Router()

router.post('/register-user', signUpUser)
router.post('/register-company', signUpCompany)
router.post('/signIn', signIn)

export default router;