import Joi from 'joi';

const taskSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    day: Joi.date().min('now').iso().required(),
    status: Joi.string().required(),
    userId: Joi.number().integer().required()
});

export { taskSchema };