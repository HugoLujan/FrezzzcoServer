import { Router } from "express";
import { checkJwt } from "../middlewares/admin.middleware.js";

import {
    logInUser
} from "../controllers/auth.contoller.js";

const router = Router();

router.post('/login', logInUser);

// router.post('/auth/change-password', [checkJwt], changePassword);

export default router;