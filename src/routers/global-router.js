import express from 'express';
import { homeController } from '../controllers/video-controller';
import { joinController } from '../controllers/user-controller';

const globalRouter = express.Router();

globalRouter.get('/', homeController);
globalRouter.get('/join', joinController);

export default globalRouter;
