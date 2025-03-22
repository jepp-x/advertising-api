import Joi from "joi";

export const registerUserValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password'),
    role: Joi.string().valid('user', 'vendor').optional() //Role is optional, default to 'user' if not set/chosen/selected
}).with('password', 'confirmPassword');

export const loginUserValidator = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const updateUserValidator = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().optional(),
    confirmPassword: Joi.ref('password'),
    role: Joi.string().valid('user', 'vendor').optional(),
})
