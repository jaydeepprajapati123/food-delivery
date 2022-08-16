import Joi from "joi";

const UpdateUserSchema = Joi.object({
    userId: Joi.string().min(3),
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string().regex(/^[6-9]{1}[0-9]{9}$/).messages({ 'string.pattern.base': `Phone number is not Valid.` }),
    userImg: Joi.string(),
    notification_token: Joi.number()
});



export default UpdateUserSchema;


    // balance: Joi.number(),
    // address: Joi.array(),
    // typr: Joi.string(),
    // line: Joi.string(),
    // locality: Joi.string(),
    // city: Joi.string(),
    // state: Joi.string(),
    // pincode: Joi.string().regex(/^[0-9]{6}$/).messages({ 'string.pattern.base': `Pincode is not Valid.` })