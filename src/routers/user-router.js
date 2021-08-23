import express from 'express';
import { publicOnlyMiddleware, protectorMiddleware } from '../middlewares';
import {
    startGithubLogin,
    finishGithubLogin,
    logoutController,
    getEditUserController,
    postEditUserController,
    removeUserController,
    seeUserController,
} from '../controllers/user-controller';

const usersRouter = express.Router();

usersRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin);
usersRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin);
usersRouter.get('/logout', protectorMiddleware, logoutController);
usersRouter
    .route('/edit')
    .all(protectorMiddleware)
    .get(getEditUserController)
    .post(postEditUserController);
usersRouter.get('/remove', removeUserController);
usersRouter.get('/:id', seeUserController);

export default usersRouter;
