import express from 'express';
import {
    homeController,
    searchController,
} from '../controllers/video-controller';
import {
    getJoinController,
    postJoinController,
    getLoginController,
    postLoginController,
} from '../controllers/user-controller';

const rootRouter = express.Router();

rootRouter.get('/', homeController);
rootRouter.route('/join').get(getJoinController).post(postJoinController);
rootRouter.route('/login').get(getLoginController).post(postLoginController);
rootRouter.get('/search', searchController);

export default rootRouter;
