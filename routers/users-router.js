import express from 'express';
import routes from '../routes';
import {
  // usersController,
  userDetailController,
  editProfileController,
  changePasswordController,
} from '../controllers/userController';

const usersRouter = express.Router();

// usersRouter.get(routes.users, usersController);
usersRouter.get(routes.editProfile, editProfileController);
usersRouter.get(routes.changePassword, changePasswordController);
// NOTE -> :id
usersRouter.get(routes.userDetail, userDetailController);

export default usersRouter;
