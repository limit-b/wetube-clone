import express from 'express';
import {
  watchVideoController,
  editVideoController,
} from '../controllers/video-controller';

const videosRouter = express.Router();

videosRouter.get('/watch', watchVideoController);
videosRouter.get('/edit', editVideoController);

export default videosRouter;
