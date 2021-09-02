import express from 'express';
import {
    publicOnlyMiddleware,
    protectorMiddleware,
    uploadMiddleware,
} from '../middlewares';
import {
    startGithubLogin,
    finishGithubLogin,
    logoutController,
    getEditUserController,
    postEditUserController,
    getChangePasswordController,
    postChangePasswordController,
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
    .post(uploadMiddleware.single('avatar'), postEditUserController);
usersRouter
    .route('/change-password')
    .all(protectorMiddleware)
    .get(getChangePasswordController)
    .post(postChangePasswordController);
usersRouter.get('/remove', removeUserController);
usersRouter.get('/:id', seeUserController);

export default usersRouter;
