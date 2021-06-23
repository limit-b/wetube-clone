import './db';
import './models/Video';
import express from 'express';
import morgan from 'morgan';
import globalRouter from './routers/global-router';
import usersRouter from './routers/user-router';
import videosRouter from './routers/video-router';

const app = express();
const logger = morgan('dev');

const PORT = 4000;

app.set('view engine', 'pug');
// cwd ---> current working directory
app.set('views', `${process.cwd()}/src/views`);
// "body-parser" deplicated
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use('/', globalRouter);
app.use('/users', usersRouter);
app.use('/videos', videosRouter);

const handleListening = () =>
  console.log(`✅ Server listening on: http://localhost:${PORT}/`);

app.listen(PORT, handleListening);
