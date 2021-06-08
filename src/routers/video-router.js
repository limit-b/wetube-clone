import express from 'express';
import {
  uploadVideoController,
  seeVideoController,
  editVideoController,
  deleteVideoController,
} from '../controllers/video-controller';

const videosRouter = express.Router();

videosRouter.get('/upload', uploadVideoController);
videosRouter.get('/:id(\\d+)', seeVideoController);
videosRouter.get('/:id(\\d+)/edit', editVideoController);
videosRouter.get('/:id(\\d+)/delete', deleteVideoController);

export default videosRouter;
