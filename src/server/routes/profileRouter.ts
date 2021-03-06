import { Router } from 'express';
import { handleSaveProfile, handleSavePassword, handleSaveAvatar, handleGetAvatar, handleGetUserDB } from 'server/controllers/profile';
import * as config from 'config/api';
import multer from 'multer';
const profileRouter = Router();

profileRouter.get(config.userDB, handleGetUserDB);
profileRouter.put(config.saveProfile, handleSaveProfile);
profileRouter.put(config.savePassword, handleSavePassword);
profileRouter.get('/resources/:id/:avatarUrl', handleGetAvatar);

// Мидлвэр для загрузки файла
const storage = multer.memoryStorage();
const upload = multer({ storage });
profileRouter.put(config.saveAvatar, upload.single('avatar'), handleSaveAvatar);

export default profileRouter;
