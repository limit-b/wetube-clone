import express from 'express';
import {
  editUserController,
  removeUserController,
} from '../controllers/user-controller';

const usersRouter = express.Router();

usersRouter.get('/edit', editUserController);
usersRouter.get('/remove', removeUserController);

export default usersRouter;
