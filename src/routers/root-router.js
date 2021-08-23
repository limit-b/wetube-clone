import express from 'express';
import {
    homeController,
    searchController,
} from '../controllers/video-controller';
import { publicOnlyMiddleware } from '../middlewares';
import {
    getJoinController,
    postJoinController,
    getLoginController,
    postLoginController,
} from '../controllers/user-controller';

const rootRouter = express.Router();

rootRouter.get('/', homeController);
rootRouter
    .route('/join')
    .all(publicOnlyMiddleware)
    .get(getJoinController)
    .post(postJoinController);
rootRouter
    .route('/login')
    .all(publicOnlyMiddleware)
    .get(getLoginController)
    .post(postLoginController);
rootRouter.get('/search', searchController);

export default rootRouter;
