import { Router } from 'express';
import multer from 'multer';
import { getCustomRepository } from 'typeorm';

import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import UpdatUserAvatarService from '../services/UpdatUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({name, email, password});

    delete user.password;

    return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated,  upload.single('avatar'), async (request, response) => {

    const updatUserAvatarService = new UpdatUserAvatarService();

    const user = await updatUserAvatarService.execute( { 
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
});

export default usersRouter;
