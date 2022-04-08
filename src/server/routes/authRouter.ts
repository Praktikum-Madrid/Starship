import { Router } from 'express';
import { handleGetUserData, handleSignIn, handleSignUp, handleLogOut } from 'server/controllers/auth';
import * as config from 'config/api';
const authRouter = Router();

authRouter.post(config.signIn, handleSignIn);
authRouter.post(config.signUp, handleSignUp);
authRouter.get(config.getUser, handleGetUserData);
authRouter.post(config.logOut, handleLogOut);

export default authRouter;
