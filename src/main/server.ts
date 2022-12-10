import express, { Request, Response } from 'express';
import { envs } from './config/envs';
import personRouter from './routes/person-router';
import relationshipRouter from './routes/relationship-router';

const app = express();
app.use(express.json());
app.use(personRouter);
app.use(relationshipRouter);

app.get('/health', (_: Request, response: Response) => {
  return response.json({ message: 'ok' });
});

app.listen(envs.port, () =>
  console.log(`Server running in http://localhost:${envs.port}`),
);
