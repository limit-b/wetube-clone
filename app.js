import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';
import globalRouter from './routers/global-router';
import usersRouter from './routers/users-router';
import videosRouter from './routers/videos-router';
import { localsMiddleware } from './middlewares';

const app = express();

app.use(helmet());
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, usersRouter);
app.use(routes.videos, videosRouter);
// app.get('/test', (req, res) => res.render('test/test'));

export default app;
