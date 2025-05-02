import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;

app.use(express.static('views'));
app.use(routes);

app.listen(port, () => {
  console.log(`Listening on https://localhost:${port}`);
});

export default app;
