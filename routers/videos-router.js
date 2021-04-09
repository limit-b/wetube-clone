import express from 'express';
import routes from '../routes';

const videosRouter = express.Router();

videosRouter.get('/', (req, res) => res.send('videos'));
videosRouter.get('/upload', (req, res) => res.send('upload'));
videosRouter.get('/:id', (req, res) => res.send('video detail'));
videosRouter.get('/:id/edit', (req, res) => res.send('edit video'));
videosRouter.get('/:id/delete', (req, res) => res.send('delete video'));

export default videosRouter;
