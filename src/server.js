import express from 'express';
import morgan from 'morgan';

const app = express();
const logger = morgan('dev');

const PORT = 4000;

const globalRouter = express.Router();
const usersRouter = express.Router();
const videosRouter = express.Router();

app.use(logger);
// Router == 전역 middleware ---> use() 사용
app.use('/', globalRouter);
app.use('/users', usersRouter);
app.use('/videos', videosRouter);

const homeController = (req, res) => res.send('home page');
const editUserController = (req, res) => res.send('edit user page');
const watchVideoController = (req, res) => res.send('watch video page');

globalRouter.get('/', homeController);
usersRouter.get('/edit', editUserController);
videosRouter.get('/watch', watchVideoController);

const handleListening = () =>
  console.log(`✅ Server listening on: http://localhost:${PORT}/`);

app.listen(PORT, handleListening);
