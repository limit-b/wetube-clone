import express from 'express';

const app = express();

const PORT = 4000;

const logger = (req, res, next) => {
  console.log(`${req.method} --- ${req.url}`);
  next();
};

// const privateMiddleware = (req, res, next) => {
//   const { url } = req;
//   if (url === '/protected') {
//     res.send('<h1>Not allowed</h1>');
//   }
//   console.log('Allowed, you may continue');
//   next();
// };

const handleHome = (req, res) => {
  // console.log('@@@!!!request!!!@@@');
  // console.log(req);
  // console.log('@@@!!!response!!!@@@');
  // console.log(res);
  // return res.end();
  res.send('<h1>home page</h1>');
};

const handleLogin = (req, res) => res.send({ message: 'login page' });

// const handleProtected = (req, res) => res.send('Welcome to the private lounge');

app.use(logger);
// app.use(privateMiddleware);
app.get('/', handleHome);
app.get('/login', handleLogin);
// app.get('/protected', handleProtected);

const handleListening = () =>
  console.log(`✅ Server listening on: http://localhost:${PORT}/`);

app.listen(PORT, handleListening);
