import express from 'express';
import {
    startGithubLogin,
    finishGithubLogin,
    logoutController,
    editUserProfileController,
    removeUserProfileController,
    seeUserController,
} from '../controllers/user-controller';

const usersRouter = express.Router();

usersRouter.get('/github/start', startGithubLogin);
usersRouter.get('/github/finish', finishGithubLogin);
usersRouter.get('/logout', logoutController);
usersRouter.get('/edit', editUserProfileController);
usersRouter.get('/remove', removeUserProfileController);
usersRouter.get('/:id', seeUserController);

export default usersRouter;
