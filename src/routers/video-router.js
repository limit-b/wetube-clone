import express from 'express';
import {
  uploadVideoController,
  seeVideoController,
  editVideoController,
  deleteVideoController,
} from '../controllers/video-controller';

const videosRouter = express.Router();

videosRouter.get('/upload', uploadVideoController);
videosRouter.get('/:id', seeVideoController);
videosRouter.get('/:id/edit', editVideoController);
videosRouter.get('/:id/delete', deleteVideoController);

export default videosRouter;
