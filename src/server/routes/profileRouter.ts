import { Router } from 'express';
import { handleSaveProfile, handleSavePassword, handleSaveAvatar } from 'server/controllers/profile';
import * as config from 'config/api';
import multer from 'multer';
const profileRouter = Router();

profileRouter.put(config.saveProfile, handleSaveProfile);
profileRouter.put(config.savePassword, handleSavePassword);

const storage = multer.memoryStorage();
const upload = multer({ storage });

profileRouter.put(config.saveAvatar, upload.single('avatar'), handleSaveAvatar);

export default profileRouter;
