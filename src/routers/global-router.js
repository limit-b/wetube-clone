import express from 'express';
import { homeController } from '../controllers/global-controller';

const globalRouter = express.Router();

globalRouter.get('/', homeController);

export default globalRouter;
