import Joi from "joi";

export const registerUserValidator = Joi.object({
    firstName: Joi.string().regex(/^[A-Za-z]+$/).required(),
    lastName: Joi.string().regex(/^[A-Za-z]+$/).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')),
    role: Joi.string().valid('user', 'vendor', 'admin').optional() //Role is optional, default to 'user' if not set/chosen/selected
}).with("password", "confirmPassword");

export const loginUserValidator = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const updateUserValidator = Joi.object({
    firstName: Joi.string().regex(/^[A-Za-z]+$/).optional(),
    lastName: Joi.string().regex(/^[A-Za-z]+$/).optional(),
    email: Joi.string().optional(),
    password: Joi.string().optional(),
    confirmPassword: Joi.ref('password'),
    role: Joi.string().valid('user', 'vendor', 'admin').optional(),
})
