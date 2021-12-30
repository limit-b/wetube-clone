import express from 'express';
import {
    registerViewController,
    createCommentController,
    deleteCommentController,
} from '../controllers/video-controller';

const apiRouter = express.Router();

apiRouter.post('/videos/:id([0-9a-f]{24})/view', registerViewController);
apiRouter.post('/videos/:id([0-9a-f]{24})/comment', createCommentController);
apiRouter.delete('/videos/:id([0-9a-f]{24})/comment', deleteCommentController);

export default apiRouter;
