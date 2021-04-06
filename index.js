import express from 'express';
const app = express();

const PORT = 4000;

const handleHome = (req, res) => res.send('Hello from home\n');

const handleProfile = (req, res) => res.send('You are on my profile');

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}/`);

app.get('/', handleHome);
// app.get('/', (req, res) => {
//   res.send('Hello from home\n');
// });

app.get('/profile', handleProfile);
// app.get('/profile', (req, res) => {
//   res.send('You are on my profile');
// });

app.listen(PORT, handleListening);
// app.listen(PORT, () => {
//   console.log(`Listening on: http://localhost:${PORT}/`);
// });
