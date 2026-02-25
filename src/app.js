import express from 'express';
import tasksRouter from './routes/taskRoutes.js';
import authRouter from './routes/authRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/tasks', tasksRouter);
app.use('/', authRouter)

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.use(errorHandler);

export default app;