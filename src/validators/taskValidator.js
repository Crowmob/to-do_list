import Joi from 'joi';

export const taskSchema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    priority: Joi.number().integer().min(1).max(5).required()
})

export const taskIdSchema = Joi.object({
    id: Joi.number().integer().min(1).required()
})