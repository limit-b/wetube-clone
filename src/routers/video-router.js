import express from 'express';
import { watchVideoController } from '../controllers/video-controller';

const videosRouter = express.Router();

videosRouter.get('/watch', watchVideoController);

export default videosRouter;
