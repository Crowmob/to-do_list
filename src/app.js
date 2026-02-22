import express from 'express';
import tasksRouter from './routes/taskRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.use(errorHandler);

export default app;