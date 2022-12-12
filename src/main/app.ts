import express from 'express';
import personRouter from './routes/person-router';
import recommendationsRouter from './routes/recommendations-router';
import relationshipRouter from './routes/relationship-router';

const app = express();
app.use(express.json());
app.use(personRouter);
app.use(relationshipRouter);
app.use(recommendationsRouter);

export default app;
