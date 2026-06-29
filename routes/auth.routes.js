import { Router } from 'express';
import {signIn, signOut, signOutAllDevices, signUp} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);
authRouter.post('/sign-out-all-devices', signOutAllDevices);

export default authRouter;