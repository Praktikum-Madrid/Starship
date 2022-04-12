import { Router } from 'express';
import { handleGetUserData } from '../controllers/user';

const userRouter = Router();

userRouter.get('/user/me', handleGetUserData);

export default userRouter;
