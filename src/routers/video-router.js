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
videosRouter.get('/:id([0-9a-f]{24})', watchVideoController);
videosRouter
    .route('/:id([0-9a-f]{24})/edit')
    .get(getEditVideoController)
    .post(postEditVideoController);
videosRouter.get('/:id([0-9a-f]{24})/delete', deleteVideoController);

export default videosRouter;
