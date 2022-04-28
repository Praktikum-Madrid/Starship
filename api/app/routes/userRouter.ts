import { Router } from 'express';
import {
  handleSetTheme,
  handleUpdateUserById,
  handleGetUserById,
  handleCreateUser,
  handleGetUuidCookie,
} from '../controllers/user';

const userRouter = Router();

userRouter.post('/user/update', handleUpdateUserById);
userRouter.post('/user/me', handleGetUserById);
userRouter.post('/user/uuid', handleGetUuidCookie);
userRouter.post('/user/theme', handleSetTheme);
userRouter.post('/user', handleCreateUser);

export default userRouter;
