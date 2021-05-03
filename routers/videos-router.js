import express from 'express';
import routes from '../routes';
import {
  // videosController,
  getUploadController,
  postUploadController,
  videoDetailController,
  editVideoController,
  deleteVideoController,
} from '../controllers/videoController';
import { uploadVideoMiddleware } from '../middlewares';

const videosRouter = express.Router();

// videosRouter.get(routes.videos, videosController);
videosRouter.get(routes.upload, getUploadController);
videosRouter.post(routes.upload, uploadVideoMiddleware, postUploadController);
videosRouter.get(routes.videoDetail(), videoDetailController);
videosRouter.get(routes.editVideo, editVideoController);
videosRouter.get(routes.deleteVideo, deleteVideoController);

export default videosRouter;
