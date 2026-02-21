const express = require('express');
const tasksRouter = require('./routers/tasks');
const errorHadler = require('./middlewares/errorHandler');
const app = express();

app.use(express.json());

app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.use(errorHadler);

module.exports = app;