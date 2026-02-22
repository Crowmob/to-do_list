import express from 'express';
import tasksRouter from './routes/tasks';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.use(errorHadler);

export default app;