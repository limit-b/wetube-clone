import express from 'express';
import routes from '../routes';
import {
  getUploadController,
  postUploadController,
  videoDetailController,
  getEditVideoController,
  postEditVideoController,
  deleteVideoController,
} from '../controllers/videoController';
import { uploadVideoMiddleware } from '../middlewares';

const videosRouter = express.Router();

videosRouter.get(routes.upload, getUploadController);
videosRouter.post(routes.upload, uploadVideoMiddleware, postUploadController);
videosRouter.get(routes.videoDetail(), videoDetailController);
videosRouter.get(routes.editVideo(), getEditVideoController);
videosRouter.post(routes.editVideo(), postEditVideoController);
videosRouter.get(routes.deleteVideo(), deleteVideoController);

export default videosRouter;
