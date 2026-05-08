import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello from Acquisitions!');
});

export default app;

// npm install eslint @eslint/js prettier eslint-config-prettier eslint-plugin-prettier globals -D
// npm run lint
// npm run lint:fix
// npm run format
// npm run format:check
