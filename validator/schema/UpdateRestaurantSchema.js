import Joi from "joi";

const UpdateRestaurantSchema = Joi.object({
    resId: Joi.string().required(),
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^[6-9]{1}[0-9]{9}$/).messages({ 'string.pattern.base': `Phone number is not Valid.` }).required()
});



export default UpdateRestaurantSchema;