import express from 'express';
import {
  uploadVideoController,
  watchVideoController,
  getEditVideoController,
  postEditVideoController,
  deleteVideoController,
} from '../controllers/video-controller';

const videosRouter = express.Router();

videosRouter.get('/upload', uploadVideoController);
videosRouter.get('/:id(\\d+)', watchVideoController);
videosRouter
  .route('/:id(\\d+)/edit')
  .get(getEditVideoController)
  .post(postEditVideoController);
// videosRouter.get('/:id(\\d+)/edit', getEditVideoController);
// videosRouter.post('/:id(\\d+)/edit', postEditVideoController);
videosRouter.get('/:id(\\d+)/delete', deleteVideoController);

export default videosRouter;
