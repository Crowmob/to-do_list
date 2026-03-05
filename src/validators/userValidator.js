import Joi from 'joi';

export const userSchema = Joi.object({
    username: Joi.string().min(1).max(50).required(),
    password: Joi.string().min(1).required()
})