import Joi from "joi";

export const advertValidator = Joi.object({
    name: Joi.string().required(),
    pr
})