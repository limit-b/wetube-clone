import express from 'express';
import routes from '../routes';
import {
  videosController,
  uploadController,
  videoDetailController,
  editVideoController,
  deleteVideoController,
} from '../controllers/videoController';

const videosRouter = express.Router();

videosRouter.get(routes.videos, videosController);
videosRouter.get(routes.upload, uploadController);
videosRouter.get(routes.videoDetail, videoDetailController);
videosRouter.get(routes.editVideo, editVideoController);
videosRouter.get(routes.deleteVideo, deleteVideoController);

export default videosRouter;
