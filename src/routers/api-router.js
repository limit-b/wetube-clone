import express from 'express';
import { registerViewController } from '../controllers/video-controller';

const apiRouter = express.Router();

apiRouter.post('/videos/:id([0-9a-f]{24})/view', registerViewController);

export default apiRouter;
