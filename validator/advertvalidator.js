import Joi from "joi";

export const advertValidator = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    description: Joi.string().required(),
    pictures: Joi.array().items(Joi.string().required()),
    category: Joi.string().required().valid("fashion and accessories", "beauty products", "kids and toys")
});

export const updateAdvertValidator = Joi.object({
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    quantity: Joi.number().optional(),
    description: Joi.string().optional(),
    pictures: Joi.array().items(Joi.string()).optional()
});

export const advertIdValidator = Joi.object({
    id: Joi.string().required()
})