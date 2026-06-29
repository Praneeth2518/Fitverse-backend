import { Router } from 'express';
import {deleteUser, getAllUsers, getUserData, updateUserData} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/all', getAllUsers);

userRouter.get('/:id', getUserData);
userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', updateUserData);

export default userRouter;