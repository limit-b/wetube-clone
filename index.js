const express = require('express');
const app = express();

const PORT = 4000;

function handleHome(req, res) {
  res.send('Hello from home\n');
}

function handleProfile(req, res) {
  res.send('You are on my profile');
}

function handleListening() {
  console.log(`Listening on: http://localhost:${PORT}/`);
}

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
