import express from 'express';
import { editUserController } from '../controllers/user-controller';

const usersRouter = express.Router();

usersRouter.get('/edit', editUserController);

export default usersRouter;
