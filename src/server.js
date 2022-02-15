import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'express-flash';
import { localsMiddleware } from './middlewares';
import rootRouter from './routers/root-router';
import usersRouter from './routers/user-router';
import videosRouter from './routers/video-router';
import apiRouter from './routers/api-router';

const app = express();
const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', `${process.cwd()}/src/views`);

app.use((req, res, next) => {
    res.header('Cross-Origin-Embedder-Policy', 'require-corp');
    res.header('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});

// "body-parser" deplicated
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        // cookie: { maxAge: 20000 },
        store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URL }),
    })
);

app.use(flash());
app.use(localsMiddleware);
app.use('/uploads', express.static('uploads'));
app.use(
    '/static',
    express.static('assets')
    // express.static('node_modules/@ffmpeg/core/dist')
);

app.use('/', rootRouter);
app.use('/users', usersRouter);
app.use('/videos', videosRouter);
app.use('/api', apiRouter);

export default app;
