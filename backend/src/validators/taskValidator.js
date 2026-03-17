import Joi from 'joi';

export const taskSchema = Joi.object({
    name: Joi.string().min(1).max(200).required(),
    priority: Joi.number().integer().min(1).max(5).required(),
    completed: Joi.bool()
})