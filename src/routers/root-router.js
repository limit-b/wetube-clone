import express from 'express';
import {
    homeController,
    searchController,
} from '../controllers/video-controller';
import {
    getJoinController,
    postJoinController,
    loginController,
} from '../controllers/user-controller';

const rootRouter = express.Router();

rootRouter.get('/', homeController);
rootRouter.route('/join').get(getJoinController).post(postJoinController);
rootRouter.get('/login', loginController);
rootRouter.get('/search', searchController);

export default rootRouter;
