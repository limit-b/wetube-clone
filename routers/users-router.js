import express from 'express';
import routes from '../routes';
import {
  userDetailController,
  editProfileController,
  changePasswordController,
} from '../controllers/userController';

const usersRouter = express.Router();

usersRouter.get(routes.editProfile, editProfileController);
usersRouter.get(routes.changePassword, changePasswordController);
// NOTE -> :id
usersRouter.get(routes.userDetail(), userDetailController);

export default usersRouter;
