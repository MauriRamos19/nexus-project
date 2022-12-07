import { Router } from "express";
import { protect } from "../controllers/auth.controller";
import { getCompany, getEntity, getUsers } from "../controllers/entities.controller";


const router = Router()

router.get('/users', protect, getUsers)
router.get('/company', getCompany)
router.get('/',protect, getEntity)

export default router;