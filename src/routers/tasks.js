const express = require('express');
const logger = require('../utils/logger');
const { taskSchema, taskIdSchema } = require('../validators/taskValidator');
const { validateBody, validateParams } = require('../validators/validate');
const router = express.Router();

router.get('/', (req, res) => {
    logger.info("Tasks endpoint accessed");
    res.send("Tasks endpoint");
})

router.get('/:id', validateParams(taskIdSchema), (req, res, next) => {
    const id = Number(req.params.id);
    logger.info(`Task with ID: ${id} accessed`);
    res.send(`Task with ID: ${id}`);
})

router.post('/', validateBody(taskSchema), (req, res) => {
    const { name, priority } = req.body;
    logger.info(`Task created with name: ${name}, priority: ${priority}`);
    res.send(`Task created with name: ${name}, priority: ${priority}`);
})

router.put('/:id', validateParams(taskIdSchema), validateBody(taskSchema), (req, res) => {
    const id = req.params.id;
    logger.info(`Task updated with ID: ${id}`);
    res.send(`Task updated with ID: ${id}`);
})

router.delete('/:id', validateParams(taskIdSchema), (req, res) => {
    const id = req.params.id;
    logger.info(`Task deleted with ID: ${id}`);
    res.send(`Task deleted with ID: ${id}`);
})

module.exports = router;