import express from 'express';
import {
  homeController,
  searchController,
} from '../controllers/video-controller';
import {
  joinController,
  loginController,
} from '../controllers/user-controller';

const globalRouter = express.Router();

globalRouter.get('/', homeController);
globalRouter.get('/join', joinController);
globalRouter.get('/login', loginController);
globalRouter.get('/search', searchController);

export default globalRouter;
