import Joi from "joi";

const RestaurantRegisterSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^[6-9]{1}[0-9]{9}$/).messages({ 'string.pattern.base': `Phone number is not Valid.` }).required(),
    line: Joi.string().required(),
    locality: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().regex(/^[1-9]{1}[0-9]{5}$/).messages({ 'string.pattern.base': `Pincode is not Valid.` }).required()
});



export default RestaurantRegisterSchema;