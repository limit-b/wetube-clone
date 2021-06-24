import express from 'express';
import morgan from 'morgan';
import globalRouter from './routers/global-router';
import usersRouter from './routers/user-router';
import videosRouter from './routers/video-router';

const app = express();
const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', `${process.cwd()}/src/views`);
// "body-parser" deplicated
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use('/', globalRouter);
app.use('/users', usersRouter);
app.use('/videos', videosRouter);

export default app;
