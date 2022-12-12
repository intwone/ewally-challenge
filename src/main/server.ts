import { Request, Response } from 'express';
import app from './app';
import { envs } from './config/envs';

app.get('/health', (_: Request, response: Response) => {
  return response.json({ message: 'ok' });
});

app.listen(envs.port, () =>
  console.log(`Server running in http://localhost:${envs.port}`),
);
