import express from 'express';
import {
  uploadVideoController,
  watchVideoController,
  editVideoController,
  deleteVideoController,
} from '../controllers/video-controller';

const videosRouter = express.Router();

videosRouter.get('/upload', uploadVideoController);
videosRouter.get('/:id(\\d+)', watchVideoController);
videosRouter.get('/:id(\\d+)/edit', editVideoController);
videosRouter.get('/:id(\\d+)/delete', deleteVideoController);

export default videosRouter;
