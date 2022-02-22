import express from 'express';
import { protectorMiddleware, uploadVideoMiddleware } from '../middlewares';
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
    .all(protectorMiddleware)
    .get(getUploadVideoController)
    .post(
        uploadVideoMiddleware.fields([
            { name: 'videoFile', maxCount: 1 },
            { name: 'thumbnailFile', maxCount: 1 },
        ]),
        postUploadVideoController
    );
videosRouter.get('/:id([0-9a-f]{24})', watchVideoController);
videosRouter
    .route('/:id([0-9a-f]{24})/edit')
    .all(protectorMiddleware)
    .get(getEditVideoController)
    .post(postEditVideoController);
videosRouter.get(
    '/:id([0-9a-f]{24})/delete',
    protectorMiddleware,
    deleteVideoController
);

export default videosRouter;
