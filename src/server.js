import express from 'express';

const app = express();

const PORT = 4000;

app.get('/', (req, res) => res.send('somebody is trying to go home'));

const handleListening = () =>
  console.log(`✅ Server listening on: http://localhost:${PORT}/`);

app.listen(PORT, handleListening);
