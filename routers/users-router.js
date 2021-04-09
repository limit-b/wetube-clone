import express from 'express';
import routes from '../routes';

const usersRouter = express.Router();

usersRouter.get('/', (req, res) => res.send('users'));
usersRouter.get('/:id', (req, res) => res.send('user detail'));
usersRouter.get('/edit-profile', (req, res) => res.send('edit profile'));
usersRouter.get('/change-password', (req, res) => res.send('change password'));

export default usersRouter;
