import { Router } from 'express';
import {
  handleSetTheme,
  handleUpdateUserById,
  handleGetUserById,
  handleCreateUser,
  handleGetUuidCookie,
} from '../controllers/user';

const userRouter = Router();

userRouter.post('/api/user/update', handleUpdateUserById);
userRouter.post('/api/user/me', handleGetUserById);
userRouter.post('/api/user/uuid', handleGetUuidCookie);
userRouter.post('/api/user/theme', handleSetTheme);
userRouter.post('/api/user', handleCreateUser);

export default userRouter;
