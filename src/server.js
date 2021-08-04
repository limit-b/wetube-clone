import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import rootRouter from './routers/root-router';
import usersRouter from './routers/user-router';
import videosRouter from './routers/video-router';

const app = express();
const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', `${process.cwd()}/src/views`);
// "body-parser" deplicated
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(session({ secret: 'Hello!', resave: true, saveUninitialized: true }));

app.use((req, res, next) => {
    // console.log(req.headers);
    // next();
    req.sessionStore.all((error, sessions) => {
        console.log(sessions);
        next();
    });
});
app.get('/add-one', (req, res, next) => {
    req.session.potato += 1;
    return res.send(`${req.session.id}\n${req.session.potato}`);
});

app.use('/', rootRouter);
app.use('/users', usersRouter);
app.use('/videos', videosRouter);

export default app;
