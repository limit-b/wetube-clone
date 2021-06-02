import express from 'express';
import morgan from 'morgan';
import globalRouter from './routers/global-router';
import usersRouter from './routers/user-router';
import videosRouter from './routers/video-router';

const app = express();
const logger = morgan('dev');

const PORT = 4000;

app.use(logger);
// Router == 전역 middleware ---> use() 사용
app.use('/', globalRouter);
app.use('/users', usersRouter);
app.use('/videos', videosRouter);

const handleListening = () =>
  console.log(`✅ Server listening on: http://localhost:${PORT}/`);

app.listen(PORT, handleListening);
