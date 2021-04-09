import express from 'express';
import routes from '../routes';
import {
  homeVideoController,
  searchVideoController,
} from '../controllers/videoController';
import {
  joinUserController,
  loginUserController,
  logoutUserController,
} from '../controllers/userController';

const globalRouter = express.Router();

globalRouter.get(routes.home, homeVideoController);
globalRouter.get(routes.search, searchVideoController);
globalRouter.get(routes.join, joinUserController);
globalRouter.get(routes.login, loginUserController);
globalRouter.get(routes.logout, logoutUserController);

export default globalRouter;
