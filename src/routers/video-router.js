import express from 'express';
import {
  getUploadVideoController,
  postUploadVideoController,
  watchVideoController,
  getEditVideoController,
  postEditVideoController,
  deleteVideoController,
} from '../controllers/video-controller';

const videosRouter = express.Router();

videosRouter
  .route('/upload')
  .get(getUploadVideoController)
  .post(postUploadVideoController);
videosRouter.get('/:id(\\d+)', watchVideoController);
videosRouter
  .route('/:id(\\d+)/edit')
  .get(getEditVideoController)
  .post(postEditVideoController);
videosRouter.get('/:id(\\d+)/delete', deleteVideoController);

export default videosRouter;
