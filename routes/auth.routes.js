import { Router } from 'express';
import {signIn, signOut, signOutAllDevices, signUp} from "../controllers/auth.controller.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';


const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);
authRouter.post('/sign-out-all-devices', authMiddleware, signOutAllDevices);

export default authRouter;